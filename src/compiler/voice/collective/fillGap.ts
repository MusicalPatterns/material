import { as, difference, Duration, isUndefined, Maybe, Ms, notAs, Point } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'
import { Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { computeSoundsDuration } from '../totalCompiledDuration'
import { Section } from '../types'
import { computeFillGapSounds } from './fillGapSounds'
import { computeRepetendSounds } from './repetendSounds'
import { FillGapParameters } from './types'

const fillGap: (parameters: {
    collectiveEndTime: Point<Ms>,
    scales: Scale[],
    sectionInfos: SectionInfo[],
    sections: Section[],
    sounds: Sound[],
}) => Sound[] =
    ({ sounds, sectionInfos, sections, scales, collectiveEndTime }: FillGapParameters): Sound[] => {
        const repetendSounds: Maybe<Sound[]> = computeRepetendSounds({ sections, scales, sectionInfos })

        if (isUndefined(repetendSounds)) {
            return sounds
        }

        const gapToBeFilled: Duration = difference(
            as.Delta<Ms>(notAs.Point(collectiveEndTime)),
            computeSoundsDuration(sounds),
        )

        return sounds.concat(computeFillGapSounds(repetendSounds, gapToBeFilled))
    }

export {
    fillGap,
}
