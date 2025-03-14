import { Participant } from '../../generated/types'
import { ParticipantModel } from '../model'
import { AbstractRepository } from '@crosslab/service-common'
import { EntityManager } from 'typeorm'

export class ParticipantRepository extends AbstractRepository<
    ParticipantModel,
    Participant<'request'>,
    Participant<'response'>
> {
    protected dependencies: Record<string, never> = {}

    constructor() {
        super('Participant')
    }

    protected dependenciesMet(): boolean {
        return true
    }

    initialize(entityManager: EntityManager): void {
        this.repository = entityManager.getRepository(ParticipantModel)
    }

    async write(
        model: ParticipantModel,
        data: Partial<Participant<'request'>>
    ): Promise<void> {
        if (data.role) model.role = data.role
        if (data.serviceId) model.serviceId = data.serviceId
        if (data.config) model.config = data.config
    }

    async format(model: ParticipantModel): Promise<Participant<'response'>> {
        return {
            role: model.role,
            serviceId: model.serviceId,
            config: model.config,
        }
    }
}
