#!/usr/bin/env node
import { config } from './config'
import { AppDataSource } from './data_source'
import { app } from './generated/index'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    requestIdHandling,
} from '@crosslab/service-common'

async function startUpdateService() {
    await AppDataSource.initialize()

    app.get('/update/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config) as any,
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(config.PORT)

    logger.log('info', 'Update Service started successfully')
}

/* istanbul ignore if */
if (require.main === module) {
    startUpdateService()
}
