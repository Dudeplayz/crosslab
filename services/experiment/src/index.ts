#!/usr/bin/env node
import { config, dataSourceConfig } from './config'
import { AppDataSource } from './database/dataSource'
import { app } from './generated/index'
import { isUserTypeJWT } from './generated/types'
import { apiClient } from './methods/api'
import { callbackHandling } from './operations/callbacks'
import {
    JWTVerify,
    errorHandler,
    logHandling,
    logger,
    missingRouteHandling,
    parseJwtFromAuthorizationHeader,
    requestIdHandling,
} from '@crosslab/service-common'

async function startExperimentService() {
    await AppDataSource.initialize(dataSourceConfig)

    apiClient.accessToken = config.API_TOKEN

    app.get('/experiment/status', (_req, res) => {
        res.send({ status: 'ok' })
    })

    app.initService({
        security: {
            JWT: JWTVerify(config, isUserTypeJWT, parseJwtFromAuthorizationHeader),
        },
        preHandlers: [requestIdHandling, logHandling],
        postHandlers: [callbackHandling, missingRouteHandling],
        errorHandler: errorHandler,
    })

    app.listen(config.PORT)

    logger.log('info', 'Experiment Service started successfully')
}

/** istanbul ignore if */
if (require.main === module) {
    startExperimentService()
}
