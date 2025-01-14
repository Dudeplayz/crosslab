import { Migrations } from './database/migrations'
import {
    ScopeModel,
    RoleModel,
    UserModel,
    KeyModel,
    ActiveKeyModel,
    TokenModel,
} from './database/model'
import { AppConfiguration } from './types/types'
import { logger } from '@crosslab/service-common'
import { DataSourceOptions } from 'typeorm'

export function die(reason: string): string {
    logger.log('error', reason)
    process.exit(1)
}

function initializeAppConfiguration(): AppConfiguration {
    return {
        PORT: parseInt(process.env.PORT ?? '3000'),
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        BASE_URL: process.env.BASE_URL ?? 'http://localhost:3000',
        JWKS_URL: process.env.JWKS_URL ?? 'http://localhost/.well-known/jwks.json',
        SECURITY_ISSUER:
            process.env.SECURITY_ISSUER ??
            die('the environment variable SECURITY_ISSUER is not defined!'),
        SECURITY_AUDIENCE:
            process.env.SECURITY_AUDIENCE ??
            die('the environment variable SECURITY_AUDIENCE is not defined!'),
        ALLOWLIST: process.env.ALLOWLIST ?? '',
        API_TOKEN:
            process.env.API_TOKEN ??
            die('the environment variable API_TOKEN is not defined!'),
    }
}

export const config: AppConfiguration = initializeAppConfiguration()

export const dataSourceConfig: DataSourceOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [...Migrations],
    migrationsRun: true,
    entities: [ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel],
}
