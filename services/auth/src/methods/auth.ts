import { config } from '../config'
import { repositories } from '../database/dataSource'
import { ActiveKeyModel, KeyModel, UserModel } from '../database/model'
import { BasicUserType } from '../generated/types'
import { userUrlFromId } from './utils'
import { MalformedParameterError, MissingParameterError } from '@crosslab/service-common'
import { SignJWT, JWTPayload, importJWK } from 'jose'

/**
 * @deprecated The expiration time is now disregarded.
 */
export async function sign<P extends JWTPayload>(
    payload: P,
    key: KeyModel,
    expirationTime: string
): Promise<string>
/**
 * This function signs a JWT.
 * @param payload Payload of the JWT.
 * @param key Key used for signing.
 * @returns The signed JWT.
 */
export async function sign<P extends JWTPayload>(
    payload: P,
    key: KeyModel
): Promise<string>
export async function sign<P extends JWTPayload>(
    payload: P,
    key: KeyModel,
    _expirationTime?: string
) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: key.alg, kid: key.uuid })
        .setIssuer(config.SECURITY_ISSUER)
        .setIssuedAt()
        .setAudience(config.SECURITY_AUDIENCE)
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
    scopes?: string[]
): Promise<string> {
    return await sign<BasicUserType>(
        {
            url: userUrlFromId(user.uuid),
            username: user.username,
            scopes:
                scopes ??
                user.roles
                    .map((role) => role.scopes.map((scope) => scope.name))
                    .flat(1)
                    .filter((value, index, array) => array.indexOf(value) === index),
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
    activeKey: ActiveKeyModel
): Promise<string> {
    const roleModelDevice = await repositories.role.findOneOrFail({
        where: {
            name: 'device',
        },
    })
    return await sign<BasicUserType>(
        {
            url: userUrlFromId(user.uuid),
            username: user.username,
            device: deviceUrl,
            scopes: roleModelDevice.scopes.map((scope) => scope.name),
        },
        activeKey.key,
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
