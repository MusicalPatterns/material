import { as, difference, Duration, isUndefined, Maybe, Ms, musicalAs, Point } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'
import { Scales } from '../../../types'
import { computeSoundsDuration } from '../durations'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { computeFillGapSounds } from './fillGapSounds'
import { computeRepetendSounds } from './repetendSounds'
import { FillGapParameters } from './types'

const fillGap: (parameters: {
    collectiveEndTime: Point<Ms>,
    scales: Scales,
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
            musicalAs.Duration(as.number(collectiveEndTime)),
            computeSoundsDuration(sounds),
        )

        return sounds.concat(computeFillGapSounds(repetendSounds, gapToBeFilled))
    }

export {
    fillGap,
}
