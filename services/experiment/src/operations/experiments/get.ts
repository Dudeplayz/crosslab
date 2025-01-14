import { repositories } from '../../database/dataSource'
import { getExperimentsSignature } from '../../generated/signatures'
import { logger } from '@crosslab/service-common'

/**
 * This function implements the functionality for handling GET requests on
 * /experiments endpoint.
 * @param _user The user submitting the request.
 */
export const getExperiments: getExperimentsSignature = async (_user) => {
    logger.log('info', 'Handling GET request on endpoint /experiments')

    const experimentModels = await repositories.experiment.find()

    logger.log('info', 'Successfully handled GET request on endpoint /experiments')

    return {
        status: 200,
        body: await Promise.all(
            experimentModels.map((experimentModel) =>
                repositories.experiment.formatOverview(experimentModel)
            )
        ),
    }
}
