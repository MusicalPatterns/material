import { apply, Index, isEmpty, Maybe, Ms } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'
import { Entity, Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { fillGap } from './fillGap'
import { computeSegnoIndex } from './segnoIndex'
import { ApplyCollectiveInfosParameters } from './types'

const computeSections: (entities: Entity[], index: Index<Entity>) => Section[] =
    (entities: Entity[], index: Index<Entity>): Section[] =>
        isEmpty(entities) ?
            [] :
            apply.Index(entities, index).sections || []

const applyCollectiveInfos: (parameters: {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    entities: Entity[],
    entityIndex: Index<Entity>,
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

        const segnoIndex: Index<Sound> = computeSegnoIndex({ collectiveSegnoTime, individualSegnoTime, voice })

        return { ...voice, segnoIndex }
    }

export {
    applyCollectiveInfos,
}
