import { apply, Index, isEmpty, Maybe, Ms } from '@musical-patterns/utilities'
import { Voice } from '../../../performer'
import { Entity, Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { fillGap } from './fillGap'
import { computeSegnoIndex } from './segnoIndex'
import { ApplyCollectiveInfosParameters } from './types'

const computeSections: (entities: Entity[], index: Index) => Section[] =
    (entities: Entity[], index: Index): Section[] =>
        isEmpty(entities) ?
            [] :
            apply.Index(entities, index as Index<Entity>).sections || []

const applyCollectiveInfos: (parameters: {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    entities: Entity[],
    index: Index,
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
            index,
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
                sections: computeSections(entities, index),
                sounds: voice.sounds || [],
            })
        }

        const segnoIndex: Index = computeSegnoIndex({ collectiveSegnoTime, individualSegnoTime, voice })

        return { ...voice, segnoIndex }
    }

export {
    applyCollectiveInfos,
}
