import { isEmpty, Maybe, Ms, Ordinal, use } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'
import { Entity, Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { fillGap } from './fillGap'
import { computeSegnoIndex } from './segnoIndex'
import { ApplyCollectiveInfosParameters } from './types'

const computeSections: (entities: Entity[], index: Ordinal<Entity[]>) => Section[] =
    (entities: Entity[], index: Ordinal<Entity[]>): Section[] =>
        isEmpty(entities) ?
            [] :
            use.Ordinal(entities, index).sections || []

const applyCollectiveInfos: (parameters: {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    entities: Entity[],
    entityIndex: Ordinal<Entity[]>,
    individualSegnoTime: Ms,
    scales: Maybe<Scale[]>,
    sectionInfos: SectionInfo[],
    voice: Voice,
}) => Voice =
    (
        {
            collectiveEndTime,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
            entities,
            entityIndex,
            voice,
            sectionInfos,
            individualSegnoTime,
            scales,
        }: ApplyCollectiveInfosParameters,
    ): Voice => {
        if (!collectiveShareSegnoTime) {
            voice.sounds = fillGap({
                collectiveEndTime,
                scales: scales || [],
                sectionInfos,
                sections: computeSections(entities, entityIndex),
                sounds: voice.sounds || [],
            })
        }

        const segnoIndex: Ordinal<Sound[]> = computeSegnoIndex({ collectiveSegnoTime, individualSegnoTime, voice })

        return { ...voice, segnoIndex }
    }

export {
    applyCollectiveInfos,
}
