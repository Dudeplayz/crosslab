import { repositories } from '../database/dataSource'
import { postLogoutSignature } from '../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling POST requests on /logout endpoint.
 * @param body The body of the request.
 * @param user The user submitting the request.
 * @throws {MissingEntityError} Thrown if user or token is not found in the database.
 */
export const postLogout: postLogoutSignature = async (body, user) => {
    logger.log('info', `postLogout called for ${user.JWT?.username}`)

    const userModel = await repositories.user.findOneOrFail({
        where: {
            username: user.JWT?.username,
        },
    })

    const tokenModel = userModel.tokens.find((tm) => tm.token === body.token)
    if (tokenModel) await repositories.token.remove(tokenModel)

    logger.log('info', 'postLogout succeeded')

    return {
        status: 204,
    }
}
