import { MissingEntityError } from '@crosslab/service-common'
import assert from 'assert'
import Mocha from 'mocha'
import { tokenRepository } from '../../../src/database/repositories/tokenRepository'
import { userRepository } from '../../../src/database/repositories/userRepository'
import { postLogout } from '../../../src/operations/logout'
import { TestData } from '../../data/index.spec'

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('POST /logout', context)

    suite.addTest(
        new Mocha.Test('should logout the user successfully', async function () {
            const user = testData.users['POST /logout user']
            const token = testData.tokens['POST /logout valid user token']

            const result = await postLogout(
                {
                    token: token.model.token,
                },
                {
                    JWT: {
                        username: user.model.username,
                        url: user.response.url!,
                        scopes: [],
                    },
                }
            )

            assert(result.status === 204)
            await assert.rejects(
                tokenRepository.findOneOrFail({
                    where: {
                        token: token.model.token,
                    },
                }),
                (error: unknown) => {
                    assert(error instanceof MissingEntityError)
                    assert.strictEqual(error.status, 404)
                    return true
                }
            )

            const userModel = await userRepository.findOneOrFail({
                where: {
                    username: user.model.username,
                },
            })
            assert((await userModel.tokens).length === 0)
        })
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an error if the user is not found',
            async function () {
                const token = testData.tokens['POST /logout valid user token']

                await assert.rejects(
                    async () =>
                        postLogout(
                            {
                                token: token.model.token,
                            },
                            {
                                JWT: {
                                    username: 'unknown',
                                    url: 'http://localhost:3000/users/unknown',
                                    scopes: [],
                                },
                            }
                        ),
                    (error) => {
                        assert(error instanceof MissingEntityError)
                        assert.strictEqual(error.status, 404)
                        return true
                    }
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should not delete a token which doesn't belong to the requesting user",
            async function () {
                const user = testData.users['POST /logout user']
                const token = testData.tokens['superadmin valid user token 1']

                const result = await postLogout(
                    {
                        token: token.model.token,
                    },
                    {
                        JWT: {
                            username: user.model.username,
                            url: user.response.url!,
                            scopes: [],
                        },
                    }
                )

                assert(result.status === 204)

                const tokenModel = await tokenRepository.findOneOrFail({
                    where: {
                        token: token.model.token,
                    },
                })
                assert.strictEqual(tokenModel.token, token.model.token)

                const userModel = await userRepository.findOneOrFail({
                    where: {
                        username: testData.users.superadmin.model.username,
                    },
                })
                assert(
                    (await userModel.tokens).find(
                        (tokenModel) => tokenModel.token === token.model.token
                    )
                )
            }
        )
    )

    return suite
}
