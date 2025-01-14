import { config } from '../../../src/config'
import { repositories } from '../../../src/database/dataSource'
import { TokenModel, UserModel } from '../../../src/database/model'
import { jwk } from '../../../src/methods/key'
import { userUrlFromId } from '../../../src/methods/utils'
import { getAuth } from '../../../src/operations/auth'
import { ExpiredError } from '../../../src/types/errors'
import { TestData } from '../../data/index.spec'
import {
    MissingEntityError,
    MalformedParameterError,
    InconsistentDatabaseError,
} from '@crosslab/service-common'
import assert, { fail } from 'assert'
import { createLocalJWKSet, jwtVerify } from 'jose'
import Mocha from 'mocha'
import * as sinon from 'sinon'

async function JWTVerify(jwt: string, scopes: string[]) {
    const activeKey = (
        await repositories.activeKey.find({
            relations: {
                key: true,
            },
        })
    )[0]
    const jwks = { keys: [jwk(activeKey.key)] }

    if (!jwt) throw new Error('No JWT provided')
    if (!config.SECURITY_ISSUER) throw new Error('No security issuer specified')

    const JWKS = createLocalJWKSet(jwks)
    const jwtVerifyResult = await jwtVerify(jwt, JWKS, {
        issuer: config.SECURITY_ISSUER,
        audience: config.SECURITY_AUDIENCE,
    })

    const user = jwtVerifyResult.payload
    if (!user.scopes || !Array.isArray(user.scopes))
        throw new Error('Payload is malformed')
    for (const scope of scopes) {
        if ((user.scopes as Array<any>).includes(scope)) {
            return user
        }
    }
    throw new Error('Missing Scope: one of ' + scopes)
}

async function checkJWTByTokenModel(jwt: string, token: TokenModel) {
    for (const scope of token.scopes) {
        const payload = await JWTVerify(jwt, [scope.name])
        assert((payload as any).url === userUrlFromId(token.user.uuid))
        assert((payload as any).username === token.user.username)

        const tokenScopes = [
            ...token.scopes,
            ...token.roles.map((role) => role.scopes).flat(1),
        ]

        for (const _scope of tokenScopes) {
            assert((payload as any).scopes.includes(_scope.name))
        }
        for (const _scope of (payload as any).scopes) {
            assert(
                tokenScopes.find((s) => s.name === _scope),
                `Scope '${_scope}' not found`
            )
        }
    }
}

async function checkJWTByUserModel(jwt: string, user: UserModel) {
    const scopes = user.roles.flatMap((role) => role.scopes)
    for (const scope of scopes) {
        const payload = await JWTVerify(jwt, [scope.name])
        assert((payload as any).url === userUrlFromId(user.uuid))
        assert((payload as any).username === user.username)

        for (const _scope of scopes) {
            assert((payload as any).scopes.includes(_scope.name))
        }
        for (const _scope of (payload as any).scopes) {
            assert(scopes.find((s) => s.name === _scope))
        }
    }
}

export default function (context: Mocha.Context, testData: TestData) {
    const suite = new Mocha.Suite('GET /auth', context)
    let expiredToken: string
    let invalidToken: string
    let validDeviceToken: string
    let validUserToken: string
    let allowlistedToken: string

    suite.beforeAll(function () {
        expiredToken = testData.tokens['GET /auth expired token'].model.token
        invalidToken = 'invalid'
        validDeviceToken = testData.tokens['GET /auth valid device token'].model.token
        validUserToken = testData.tokens['GET /auth valid user token'].model.token
        allowlistedToken = 'superadmin-test-token'
    })

    suite.addTest(
        new Mocha.Test(
            'should authenticate a non-allowlisted user with a valid token',
            async function () {
                const result = await getAuth({
                    Authorization: `Bearer ${validUserToken}`,
                })
                assert(result.status === 200)
                assert(result.headers['X-Request-Authentication'])
                await checkJWTByTokenModel(
                    result.headers['X-Request-Authentication'],
                    testData.tokens['GET /auth valid user token'].model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate an allowlisted user with a valid token',
            async function () {
                const result = await getAuth({
                    Authorization: `Bearer ${allowlistedToken}`,
                })
                assert(result.status === 200)
                assert(result.headers['X-Request-Authentication'])
                await checkJWTByUserModel(
                    result.headers['X-Request-Authentication'],
                    testData.users.superadmin.model
                )
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an invalid token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer ${invalidToken}`,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should return status 200 with empty headers for non-allowlisted user without an 'Authorization'-header",
            async function () {
                const result = await getAuth({})
                assert(result.status === 200)
                assert(!result.headers.Authorization)
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an expired token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer ${expiredToken}`,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof ExpiredError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            "should not authenticate a non-allowlisted user with a malformed 'Authorization'-header",
            async function () {
                const malformedAuthorizationHeaders = [
                    'malformed',
                    'Bearer Token Other',
                    'BearerToken',
                    'bearer token',
                ]

                for (const malformedAuthorizationHeader of malformedAuthorizationHeaders) {
                    try {
                        await getAuth({
                            Authorization: malformedAuthorizationHeader,
                        })
                        assert(false)
                    } catch (error) {
                        assert(error instanceof MalformedParameterError)
                        assert(error.status === 401)
                    }
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should not authenticate a non-allowlisted user with an empty token',
            async function () {
                try {
                    await getAuth({
                        Authorization: `Bearer `,
                    })
                    assert(false)
                } catch (error) {
                    assert(error instanceof MissingEntityError)
                    assert(error.status === 401)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should throw an InconsistentDatabaseError if no user is associated with the found token',
            async function () {
                const tokenRepositoryFindOneOrFailStub = sinon.stub(
                    repositories.token,
                    'findOneOrFail'
                )
                tokenRepositoryFindOneOrFailStub.resolves({
                    token: 'a6afe72e-d609-4323-aeec-b56d09a6fee7',
                    scopes: [],
                    user: undefined as any,
                    roles: [],
                })

                try {
                    await getAuth({
                        Authorization: `Bearer ${validUserToken}`,
                    })
                    fail()
                } catch (error) {
                    tokenRepositoryFindOneOrFailStub.restore()
                    assert(error instanceof InconsistentDatabaseError)
                }
            }
        )
    )

    suite.addTest(
        new Mocha.Test(
            'should authenticate a non-allowlisted device with a valid device token',
            async function () {
                const roleModelDevice = await repositories.role.findOneOrFail({
                    where: {
                        name: 'device',
                    },
                })
                const result = await getAuth({
                    Authorization: `Bearer ${validDeviceToken}`,
                })
                assert(result.status === 200)
                assert(result.headers['X-Request-Authentication'])
                await checkJWTByTokenModel(result.headers['X-Request-Authentication'], {
                    ...testData.tokens['GET /auth valid device token'].model,
                    scopes: roleModelDevice.scopes,
                })
            }
        )
    )

    return suite
}
