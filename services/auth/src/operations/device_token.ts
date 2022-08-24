import { AppDataSource } from "../data_source"
import {
    postDeviceTokenSignature
} from "../generated/signatures/device_token"
import { TokenModel, UserModel } from "../model"

export const postDeviceToken: postDeviceTokenSignature = async (user) => {
    console.log(`postDeviceToken called`)
    const userRepository = AppDataSource.getRepository(UserModel)

    const userModel = await userRepository.findOne({
        where: {
            username: user.username
        },
        relations: {
            tokens: true
        }
    })

    // TODO: check if 404 is truly the best response status
    if (!userModel) {
        console.error(`postDeviceToken failed: could not find user ${user.username}`)
        return {
            status: 404
        }
    }

    const tokenRepository = AppDataSource.getRepository(TokenModel)
    const token = tokenRepository.create()

    userModel.tokens.push(token)
    await userRepository.save(userModel)

    console.log(`postDeviceToken succeeded`)

    return {
        status: 200,
        body: token.token
    }
}
