import { getAuthSignature } from '../generated/signatures'
import { parseBearerToken, signDeviceToken, signUserToken } from '../methods/auth'
import { ExpiredError } from '../types/errors'
import { MissingEntityError, InconsistentDatabaseError } from '@crosslab/service-common'
import { activeKeyRepository } from '../database/repositories/activeKeyRepository'
import { tokenRepository } from '../database/repositories/tokenRepository'
import { allowlist, getAllowlistedUser } from '../methods/allowlist'

/**
 * This function implements the functionality for handling GET requests on /auth endpoint.
 * @param parameters The parameters of the request.
 * @throws {MissingEntityError} Thrown if token is not found in database. | Can throw errors from {@link getAllowlistedUser}. (currently all caught)
 * @throws {InconsistentDatabaseError} Thrown if multiple active keys are found.
 */
export const getAuth: getAuthSignature = async (parameters) => {
    console.log(`getAuth called`)
    const HOUR = 60 * 60 * 1000

    // Catch missing authorization header (OPTIONS requests)
    if (
        !parameters.Authorization &&
        !(parameters['X-Real-IP'] && allowlist[parameters['X-Real-IP']])
    ) {
        return {
            status: 200,
            headers: {},
        }
    }

    // Get active key
    const activeKey = await activeKeyRepository.findOneOrFail({
        where: {
            use: 'sig',
        },
    })

    // Non Allowlisted Auth
    try {
        // Resolve user from Authorization parameter
        const tokenString = parseBearerToken(parameters.Authorization)
        const token = await tokenRepository.findOneOrFail({
            where: {
                token: tokenString,
            },
        })

        if (!token.user) {
            throw new InconsistentDatabaseError(`Token has no associated user`, 500)
        }

        const user = token.user

        // Check if token is expired
        if (token.expiresOn && new Date(token.expiresOn).getTime() < Date.now()) {
            throw new ExpiredError(`Token is expired`, 401)
        }

        let jwt: string
        // Check if token has a device
        if (token.device) {
            // Sign device token
            console.log(`signing jwt for device ${token.device}`)
            jwt = await signDeviceToken(token.device, user, activeKey, token.scopes)
        } else {
            // Sign user token
            console.log(`signing jwt for user ${user.username}`)
            jwt = await signUserToken(user, activeKey, token.scopes)
        }

        // Update token expiration time
        if (token.expiresOn) token.expiresOn = new Date(Date.now() + HOUR).toISOString()
        tokenRepository.save(token)

        console.log(`getAuth succeeded`)

        return {
            status: 200,
            headers: {
                Authorization: 'Bearer ' + jwt,
            },
        }
    } catch (error) {
        // Allowlisted Auth
        if (parameters['X-Real-IP'] && allowlist[parameters['X-Real-IP']]) {
            const user = await getAllowlistedUser(parameters['X-Real-IP'])

            console.log(`signing jwt for user ${user.username}`)
            const jwt = await signUserToken(user, activeKey)

            console.log(`getAuth succeeded`)

            return {
                status: 200,
                headers: {
                    Authorization: 'Bearer ' + jwt,
                },
            }
        } else {
            if (error instanceof MissingEntityError) {
                error.status = 401
            }
            throw error
        }
    }
}
