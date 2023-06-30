import { logger } from '@crosslab/service-common'
import { exit } from 'process'

function die(reason: string): string {
    logger.log('error', reason)
    exit(1)
}

export const config = {
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
}
