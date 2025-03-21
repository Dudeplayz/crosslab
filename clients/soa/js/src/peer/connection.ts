import {TypedEmitter} from 'tiny-typed-emitter';

import {SignalingMessage} from '../deviceMessages';
import {Channel} from './channel';

export type ServiceConfig = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};
export interface PeerConnectionEvents {
  signalingMessage(msg: Omit<SignalingMessage, 'connectionUrl'>): void;
  connectionChanged(): void;
}
export interface PeerConnection extends TypedEmitter<PeerConnectionEvents> {
  state: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  tiebreaker: boolean;

  transmit(serviceConfig: ServiceConfig, id: string, channel: Channel): void;
  receive(serviceConfig: ServiceConfig, id: string, channel: Channel): void;

  handleSignalingMessage(msg: SignalingMessage): Promise<void>;
  connect(): Promise<void>;
  teardown(): void;
}
