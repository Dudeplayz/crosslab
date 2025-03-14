import { repositories } from '../database/dataSource'
import { TokenModel, UserModel } from '../database/model'
import {
    AuthenticationError,
    LdapAuthenticationError,
    LdapBindError,
    LdapError,
} from '../types/errors'
import { logger } from '@crosslab/service-common'
import { compare } from 'bcryptjs'
import { Client as LdapClient } from 'ldapts'

/**
 * This function creates a token for a user.
 * @param userModel The user the token should be created for.
 * @param expiresIn Time until the token expires (default: one hour).
 * @returns Newly created token.
 */
async function createUserToken(
    userModel: UserModel,
    expiresIn = 3600000
): Promise<TokenModel> {
    const tokenModel = await repositories.token.create({
        user: userModel.username,
        scopes: [],
        roles: userModel.roles.map((role) => role.name),
        expiresOn: new Date(Date.now() + expiresIn).toISOString(),
    })

    userModel.tokens.push(tokenModel)

    await repositories.user.save(userModel)

    return tokenModel
}

/**
 * This function creates a new user for logging in via the TUI ldap system.
 * @param username The username of the client for the TUI ldap system.
 * @returns The newly created TUI user.
 */
async function createUserTUI(username: string): Promise<UserModel> {
    const userModel = await repositories.user.create({
        username: 'tui:' + username,
        password: '',
    })
    const roleModelUser = await repositories.role.findOneOrFail({
        where: {
            name: 'user',
        },
    })
    userModel.roles = [roleModelUser]
    userModel.tokens = []
    await repositories.user.save(userModel)

    return userModel
}

/**
 * This function attempts to login at the TUI Ldap system with the provided credentials.
 * @param username Username of the client.
 * @param password Password of the client.
 * @throws {LdapAuthenticationError} Thrown if using invalid credentials.
 * @throws {LdapBindError} Thrown if ldap bind fails.
 * @throws {LdapError} Thrown if ldap search does not return any entries.
 * @returns A token on successful login.
 */
export async function loginTui(username: string, password: string): Promise<TokenModel> {
    // Initialize Ldap Client
    const client = new LdapClient({
        url: 'ldaps://ldapauth.tu-ilmenau.de:636',
        tlsOptions: {
            minVersion: 'TLSv1',
        },
        timeout: 10000,
    })

    // Bind Ldap Client
    const dn = `cn=${username},ou=user,o=uni`
    try {
        await client.bind(dn, password)
    } catch (err: any) {
        if (err.code === 49) {
            throw new LdapAuthenticationError(
                'TUI ldap authentication failed because of invalid login credentials',
                401
            )
        } else {
            // TODO add better error messages for the other errors (e.g. host unreachable)
            throw new LdapBindError('TUI ldap bind operation failed', 500)
        }
    }

    // Make Ldap Search Request
    const searchResult = await client.search(dn)
    if (searchResult.searchEntries.length === 0) {
        throw new LdapError(
            `No entries found for dn "cn=${username},ou=user,o=uni" during ldap search`,
            401
        )
    }

    // Find User with matching Username
    let userModel = await repositories.user.findOne({
        where: {
            username: 'tui:' + username,
        },
    })

    // Create new User if no User was found
    if (!userModel) {
        logger.log('info', `User tui:${username} not found, creating new user`)
        userModel = await createUserTUI(username)
    }

    return await createUserToken(userModel)
}

/**
 * This function attempts to login with the provided credentials.
 * @param username Username of the client.
 * @param password Password of the client.
 * @throws {AuthenticationError} Thrown if credentials are invalid.
 * @throws {InconsistentDatabaseError} Thrown if user found in database has no password.
 * @returns A token on successful login.
 */
export async function loginLocal(
    username: string,
    password: string
): Promise<TokenModel> {
    const userModel = await repositories.user.findOne({
        where: {
            username: `local:${username}`,
        },
    })

    if (!userModel) throw new AuthenticationError(`Invalid login credentials`, 401)

    if (!userModel.password)
        throw new AuthenticationError(
            `Password authentication not possible for this user`,
            401
        )

    if (!(await compare(password, userModel.password)))
        throw new AuthenticationError(`Invalid login credentials`, 401)

    return await createUserToken(userModel)
}
