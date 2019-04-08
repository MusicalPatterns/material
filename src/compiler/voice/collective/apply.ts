import { apply, isEmpty, Maybe, Ms, Ordinal } from '@musical-patterns/utilities'
import { Voice } from '../../../performer'
import { Entity, Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { fillGap } from './fillGap'
import { computeSegnoIndex } from './segnoIndex'
import { ApplyCollectiveInfosParameters } from './types'

const computeSections: (entities: Entity[], index: Ordinal) => Section[] =
    (entities: Entity[], index: Ordinal): Section[] =>
        isEmpty(entities) ?
            [] :
            apply.Ordinal(entities, index).sections || []

const applyCollectiveInfos: (parameters: {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    entities: Entity[],
    index: Ordinal,
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

        const segnoIndex: Ordinal = computeSegnoIndex({ collectiveSegnoTime, individualSegnoTime, voice })

        return { ...voice, segnoIndex }
    }

export {
    applyCollectiveInfos,
}
