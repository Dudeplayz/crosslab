/*
bundlePolicy: "max-compat", // transport every stream over a seperate connection if necessary
      //certificates: ,// enable certificates for faster (re-)connection time
      //iceCandidatePoolSize: , //can make the negotion faster
      iceServers: [], // STUN/TURN - Server
      iceTransportPolicy: "all", // We can also connect local und using relay servers
      //peerIdentity: , // target peer identity / security consideration
      rtcpMuxPolicy: "require",
*/
import {TypedEmitter} from 'tiny-typed-emitter';

import {SignalingMessage} from '../deviceMessages';
import {assert} from '../utils';
import {Channel, MediaChannel} from './channel';
import {PeerConnection, PeerConnectionEvents, ServiceConfig} from './connection';

const log = console;
log.trace = log.log;

interface RTCSignalingCandidateMessage extends SignalingMessage {
  signalingType: 'candidate';
  content: RTCIceCandidate;
}

interface RTCSignalingOfferMessage extends SignalingMessage {
  signalingType: 'offer';
  content: RTCSessionDescriptionInit;
}

interface RTCSignalingAnswerMessage extends SignalingMessage {
  signalingType: 'answer';
  content: RTCSessionDescriptionInit;
}

export type RTCSignalingMessage = RTCSignalingCandidateMessage | RTCSignalingOfferMessage | RTCSignalingAnswerMessage;

enum WebRTCRole {
  Callee,
  Caller,
}

enum ConnectionState {
  Unitintialized,
  Calling,
  WaitingForCall,
  WaitingForAnswer,
  ICE,
}

const trickleIce = false;

export class WebRTCPeerConnection extends TypedEmitter<PeerConnectionEvents> implements PeerConnection {
  private signalingQueue: Array<RTCSignalingMessage> = [];
  private candidateQueue: Array<RTCIceCandidate> = [];
  private isProcessing = true; //dont do anything until connect is called
  private role?: WebRTCRole;
  private _state: ConnectionState = ConnectionState.Unitintialized;
  private receivingChannels = new Map<string, Channel>();
  private transeiverMap = new Map<RTCRtpTransceiver, string>();
  private mediaChannelMap = new Map<string, MediaChannel>();
  tiebreaker!: boolean;
  pc: RTCPeerConnection;
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';

  private iceCandidateResolver?: () => void;

  private onnegotiationneeded() {
    if (this._state !== ConnectionState.Calling) {
      log.error('onnegotiationneeded fired but state is not Calling', {
        state: this._state,
      });
    }
  }

  private onicecandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate && trickleIce) {
      this.sendIceCandidate(event.candidate);
    } else if(!event.candidate && !trickleIce) {
      this.iceCandidateResolver && this.iceCandidateResolver();
    }
  }

  constructor(configuration: RTCConfiguration) {
    super();

    this.state = 'connecting';
    this.pc = new RTCPeerConnection(configuration);
    this.pc.onicecandidate = event => this.onicecandidate(event);
    this.pc.onnegotiationneeded = () => this.onnegotiationneeded;
    this.pc.ondatachannel = event => {
      console.log(event);
      const channel = this.receivingChannels.get(event.channel.label);

      if (channel !== undefined && channel.channel_type === 'DataChannel') {
        channel.send = event.channel.send.bind(event.channel);
        event.channel.onmessage = message => {
          if (channel.ondata) channel.ondata(message.data);
        };
        event.channel.onopen = () => {
          channel._setReady();
        };
        try {
          if (event.channel.readyState === 'open') channel._setReady();
        } catch (e) {
          console.log(e);
        }
      }
    };

    this.pc.onconnectionstatechange = () => {
      log.debug('WebRTCPeerConnection connectionStateChanged', {
        state: this.pc.connectionState,
      });
      this.state = this.pc.connectionState;
      this.emit('connectionChanged');
    };
  }

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    log.trace('WebRTCPeerConnection.tranceive called', {
      serviceConfig,
      id,
      channel,
    });
    const label = this.create_label(serviceConfig, id);
    if (channel.channel_type === 'DataChannel') {
      const webrtcChannel = this.pc.createDataChannel(label);
      channel.send = webrtcChannel.send.bind(webrtcChannel);
      //webrtcChannel.onopen=()=>channel._setReady;
      webrtcChannel.onopen = () => {
        channel._setReady();
      };
      try {
        if (webrtcChannel.readyState === 'open') channel._setReady();
      } catch (e) {
        console.log(e);
      }
      webrtcChannel.onmessage = event => {
        if (channel.ondata) channel.ondata(event.data);
      };
    } else if (channel.channel_type === 'MediaChannel') {
      log.trace('WebRTCPeerConnection.tranceive save channel for later consumption', {
        channel,
        label,
      });
      this.mediaChannelMap.set(label, channel);
    } else {
      assert(false); // unreachable
    }
  }

  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void {
    log.trace('WebRTCPeerConnection.receive called', {
      serviceConfig,
      id,
      channel,
    });
    const label = this.create_label(serviceConfig, id);
    this.receivingChannels.set(label, channel);
    if (channel.channel_type === 'MediaChannel') {
      log.trace('WebRTCPeerConnection.receive save channel for later consumption', {
        channel,
        label,
      });
      this.mediaChannelMap.set(label, channel);
    }
  }

  async handleSignalingMessage(msg: SignalingMessage) {
    this.signalingQueue.push(msg as RTCSignalingMessage);
    this.executeQueue();
  }

  private async executeQueue() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const message = this.signalingQueue.shift();
        if (!message) break;
        switch (message.signalingType) {
          case 'candidate':
            this.handleIceCandidate(message);
            break;
          case 'offer':
            await this.handleOffer(message);
            break;
          case 'answer':
            await this.handleAnswer(message);
            break;
        }
      }
      this.isProcessing = false;
    }
  }

  // Received Signaling and Control handling *************************************************************************
  async connect() {
    console.log('webrtc connect');
    assert(this._state === ConnectionState.Unitintialized);
    this.isProcessing = false;
    this.role = this.tiebreaker ? WebRTCRole.Caller : WebRTCRole.Callee;
    if (this.role === WebRTCRole.Caller) {
      this.createMediaChannels();
      this._state = ConnectionState.Calling;
      await this.makeOffer();
      this._state = ConnectionState.WaitingForAnswer;
      return;
    } else if (this.role === WebRTCRole.Callee) {
      this._state = ConnectionState.WaitingForCall;
      return;
    } else {
      assert(false); // unreachable
    }
  }

  private async handleOffer(msg: RTCSignalingOfferMessage) {
    //assert(this.state === ConnectionState.WaitingForCall);
    await this.makeAnswer(msg.content);
    this._state = ConnectionState.ICE;
    await this.sendIceCandidate();
  }

  private async handleAnswer(msg: RTCSignalingAnswerMessage) {
    //assert(this.state === ConnectionState.WaitingForAnswer);
    await this.acceptAnswer(msg.content);
    this._state = ConnectionState.ICE;
    await this.sendIceCandidate();
  }

  private async handleIceCandidate(msg: RTCSignalingCandidateMessage) {
    //assert(this.state === ConnectionState.ICE);
    if (msg.content !== null) {
      await this.addIceCandidate(msg.content);
    }
  }

  teardown(): void {
    this.pc.close();
    if (this.state != 'closed') {
      this.state = 'closed';
      this.emit('connectionChanged');
    }
  }

  // WebRTC and Signaling Actions ************************************************************************************

  private async makeOffer() {
    const iceCandidatePromise = new Promise<void>(resolve => {
      this.iceCandidateResolver = resolve;
    });
    log.trace('WebRTCPeerConnection.makeOffer called');
    let offer = await this.pc.createOffer();
    log.trace('WebRTCPeerConnection.makeOffer created offer', {offer});
    await this.pc.setLocalDescription(offer);
    if (trickleIce) {
      this.iceCandidateResolver && this.iceCandidateResolver();
    }
    await iceCandidatePromise;
    const _offer = this.pc.localDescription;
    if (!_offer) {
      console.log('WebRTCPeerConnection.makeOffer failed to create offer');
      throw new Error('WebRTCPeerConnection.makeOffer failed to create offer');
    }
    offer = _offer;
    if (offer.sdp === undefined) {
      throw new Error('WebRTCPeerConnection.makeOffer offer.sdp is undefined');
    }
    offer = {type: offer.type, sdp: this.modifySDP(offer.sdp)}; // TODO: Check if sdp is really optional
    log.trace('WebRTCPeerConnection.makeOffer updated offer', {offer});
    this.emit('signalingMessage', {
      signalingType: 'offer',
      content: offer,
    });
  }

  private async makeAnswer(offer: RTCSessionDescriptionInit) {
    const iceCandidatePromise = new Promise<void>(resolve => {
      this.iceCandidateResolver = resolve;
    });
    log.trace('WebRTCPeerConnection.makeAnswer called', {offer});
    await this.pc.setRemoteDescription(offer);
    this.matchMediaChannels();
    let answer = await this.pc.createAnswer();
    log.trace('WebRTCPeerConnection.makeAnswer created answer', {answer});
    await this.pc.setLocalDescription(answer); // TODO: gst-webrtc seems to not resolve the promise correctly.
    if (trickleIce) {
      this.iceCandidateResolver && this.iceCandidateResolver();
    }
    await iceCandidatePromise;
    const _answer = this.pc.localDescription;
    if (!_answer) {
      throw new Error('WebRTCPeerConnection.makeAnswer failed to create answer');
    }
    answer = _answer;
    log.trace('WebRTCPeerConnection.makeAnswer updated answer', {answer});
    if (answer.sdp === undefined) {
      throw new Error('WebRTCPeerConnection.makeAnswer answer.sdp is undefined');
    }
    answer = {type: answer.type, sdp: this.modifySDP(answer.sdp)}; // TODO: Check if sdp is really optional
    this.emit('signalingMessage', {
      signalingType: 'answer',
      content: answer,
    });
  }

  private async acceptAnswer(answer: RTCSessionDescriptionInit) {
    await this.pc.setRemoteDescription(answer);
  }

  private async addIceCandidate(candidate: RTCIceCandidate) {
    this.pc.addIceCandidate(candidate);
  }

  private async sendIceCandidate(candidate?: RTCIceCandidate) {
    if (candidate !== undefined) this.candidateQueue.push(candidate);
    if (this._state === ConnectionState.ICE) {
      for (const c of this.candidateQueue) {
        this.emit('signalingMessage', {
          signalingType: 'candidate',
          content: c,
        });
      }
      this.candidateQueue = [];
    }
  }

  // Helper functions *************************************************************************************************

  private create_label(
    serviceConfig: {
      serviceType: string;
      serviceId: string;
      remoteServiceId: string;
    },
    id: string,
  ) {
    const id1 = this.tiebreaker ? serviceConfig.serviceId : serviceConfig.remoteServiceId;
    const id2 = this.tiebreaker ? serviceConfig.remoteServiceId : serviceConfig.serviceId;
    const label = JSON.stringify([serviceConfig.serviceType, id1, id2, id]);
    return label;
  }

  private modifySDP(sdpString: string): string {
    log.trace('WebRTCPeerConnection.modifySDP called', {sdpString});
    const sections= sdpString.split('\r\nm=');
    const midRegex = /a=mid:(\S)/gm;
    const msidRegex = /(a=msid:- )\S*/gm;

    // Update the "a=msid" attribute from the video stream with the right label from the transeiverMap.
    for (const transeiver of this.transeiverMap.keys()) {
      const label = this.transeiverMap.get(transeiver);
      log.trace('WebRTCPeerConnection.modifySDP setTrack id for transeiver', {
        transeiver,
        mid: transeiver.mid,
        label,
      });
      const sectionIdx = sections.findIndex(m => {
        const result=midRegex.exec(m)
        return result && result[1] === transeiver.mid;
      });
      if (sectionIdx!== -1) {
        const modifiedSection = sections[sectionIdx].replace(msidRegex, '$1' + label);
      
        if (modifiedSection===sections[sectionIdx]) {
          log.error('WebRTCPeerConnection.modifySDP no msid found for transeiver', {transeiver});
        } else {
          sections[sectionIdx]=modifiedSection;
        }
      } else {
        log.error('WebRTCPeerConnection.modifySDP no media found for transeiver', {transeiver});
      }
    }

    sdpString = sections.join('\r\nm=');
    log.trace('WebRTCPeerConnection.modifySDP returns', {sdpString});
    return sdpString;
  }

  private matchMediaChannels() {
    log.trace('WebRTCPeerConnection.matchMediaChannels called');
    const transceivers = this.pc.getTransceivers() as RTCRtpTransceiver[];
    log.trace('WebRTCPeerConnection.matchMediaChannels transeivers', {
      transceivers,
    });
    for (const transceiver of transceivers) {
      const label = transceiver.receiver.track.label;
      log.trace('WebRTCPeerConnection.matchMediaChannels matching tramceiver', {
        transceiver,
        label,
      });
      const channel = this.mediaChannelMap.get(label);
      if (channel === undefined) {
        log.trace('WebRTCPeerConnection.matchMediaChannels no channel found for label', {label});
        continue;
      }

      let direction: RTCRtpTransceiverDirection = 'inactive';

      if (channel.track) {
        direction = 'sendonly';
        log.trace('WebRTCPeerConnection.matchMediaChannels replace track');
        transceiver.sender.replaceTrack(channel.track as MediaStreamTrack);
      }

      if (channel.ontrack) {
        direction = direction === 'sendonly' ? 'sendrecv' : 'recvonly';
        log.trace('WebRTCPeerConnection.matchMediaChannels call event listener for new track');
        channel.ontrack({track: transceiver.receiver.track});
      }

      log.trace(`WebRTCPeerConnection.matchMediaChannels set transeiver to ${direction} `);
      transceiver.direction = direction;
    }
  }

  private createMediaChannels() {
    log.trace('WebRTCPeerConnection.createMediaChannels called');
    for (const label of this.mediaChannelMap.keys()) {
      const channel = this.mediaChannelMap.get(label);
      if (channel === undefined) {
        log.error('WebRTCPeerConnection.createMediaChannels no media channel found for label', {
          label,
        });
        continue;
      }
      const rtpTranseiver: RTCRtpTransceiver = this.pc.addTransceiver(channel.track ? channel.track : 'video', {direction: 'sendrecv'});
      this.transeiverMap.set(rtpTranseiver, label);
      if (channel.ontrack) {
        channel.ontrack({track: rtpTranseiver.receiver.track});
      }
    }
  }
}
