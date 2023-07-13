import { userRepository } from '../database/repositories/userRepository'
import { getIdentitySignature, patchIdentitySignature } from '../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on /identity endpoint.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 */
export const getIdentity: getIdentitySignature = async (user) => {
    logger.log('info', 'getIdentity called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
    })

    logger.log('info', 'getIdentity succeeded')

    return {
        status: 200,
        body: await userRepository.format(userModel),
    }
}

/**
 * This function implements the functionality for handling PATCH requests on /identity endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user is not found in database.
 * @throws {InvalidValueError} Can throw errors from {@link writeUserModel}.
 */
export const patchIdentity: patchIdentitySignature = async (body, user) => {
    logger.log('info', 'patchIdentity called')

    const userModel = await userRepository.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
    })

    await userRepository.write(userModel, body ?? {})
    await userRepository.save(userModel)

    logger.log('info', 'patchIdentity succeeded')

    return {
        status: 200,
        body: await userRepository.format(userModel),
    }
}
