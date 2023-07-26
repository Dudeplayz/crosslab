import { logger } from '@crosslab/service-common'
import { exit } from 'process'
import { UpdateInformationModel } from './model'
import { DataSourceOptions } from 'typeorm'
import { Migrations } from './database/migrations'

function die(reason: string): string {
    logger.log('error', reason)
    exit(1)
}

const DEFAULT_BASE_URL = 'http://localhost:3000'

export const config = {
    PORT: parseInt(process.env.PORT ?? '3000'),
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    BASE_URL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
    JWKS_URL: process.env.JWKS_URL ?? 'http://localhost/.well-known/jwks.json',
    SECURITY_ISSUER:
        process.env.SECURITY_ISSUER ??
        die('the environment variable SECURITY_ISSUER is not define!'),
    SECURITY_AUDIENCE:
        process.env.SECURITY_AUDIENCE ??
        die('the environment variable SECURITY_AUDIENCE is not define!'),
}

export const dataSourceConfig: DataSourceOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [...Migrations],
    migrationsRun: true,
    entities: [UpdateInformationModel],
}
