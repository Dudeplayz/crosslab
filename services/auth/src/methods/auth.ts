import { ActiveKeyModel, KeyModel, ScopeModel, UserModel } from '../database/model'
import { SignJWT, JWTPayload, importJWK } from 'jose'
import { config } from '../config'
import { UserType } from '../generated/types'
import { MalformedParameterError, MissingParameterError } from '@crosslab/service-common'
import { userUrlFromId } from './utils'

/**
 * This function signs a JWT.
 * @param payload Payload of the JWT.
 * @param key Key used for signing.
 * @param expirationTime Expiration time of the JWT.
 * @returns The signed JWT.
 */
export async function sign<P extends JWTPayload>(
    payload: P,
    key: KeyModel,
    expirationTime: string
) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setAudience(config.SECURITY_AUDIENCE)
        .setExpirationTime(expirationTime)
        .sign(await importJWK(key.private_key, key.alg))
}

/**
 * This function signs a token for the user for the use of the microservice architecture.
 * @param user User for which the token should be signed.
 * @param activeKey Active key used for signing the token.
 * @returns The signed token.
 */
export async function signUserToken(
    user: UserModel,
    activeKey: ActiveKeyModel,
    scopes?: ScopeModel[]
): Promise<string> {
    return await sign<UserType>(
        {
            url: userUrlFromId(user.uuid),
            username: user.username,
            scopes:
                scopes?.map((scope) => scope.name) ??
                user.roles
                    .map((role) => role.scopes.map((scope) => scope.name))
                    .flat(1)
                    .filter((value, index, self) => self.indexOf(value) === index),
        },
        activeKey.key,
        '2h'
    )
}

/**
 * This function signs a token for the device for the use of the microservice architecture.
 * @param deviceUrl The url of the device for which the token should be signed.
 * @param user User for which the token should be signed.
 * @param activeKey Active key used for signing the token.
 * @returns The signed token.
 */
export async function signDeviceToken(
    deviceUrl: string,
    user: UserModel,
    activeKey: ActiveKeyModel,
    scopes?: ScopeModel[]
): Promise<string> {
    return await sign<UserType>(
        {
            url: userUrlFromId(user.uuid),
            username: user.username,
            device: deviceUrl,
            scopes:
                scopes?.map((scope) => scope.name) ??
                user.roles
                    .map((role) => role.scopes.map((s) => s.name))
                    .flat(1)
                    .filter((value, index, self) => self.indexOf(value) === index),
        },
        activeKey.key,
        '2h'
    )
}

/**
 * This function parses bearer token from the Authorization parameter
 * @param authorization Authorization parameter from request.
 * @returns String representation of the token.
 */
export function parseBearerToken(authorization?: string): string {
    const regex = /^Bearer (\S*)$/

    if (!authorization) {
        throw new MissingParameterError(`Authorization parameter is missing`, 401)
    }

    const match = authorization.match(regex)

    if (!match || match.length !== 2) {
        throw new MalformedParameterError(`Authorization parameter is malformed`, 401)
    }

    return match[1]
}
