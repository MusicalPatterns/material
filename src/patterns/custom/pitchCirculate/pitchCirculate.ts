import { as, Frequency, range, Integer, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import { PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByPeriodSize,
} from './tier'
import { PeriodSize, PitchCircularTechnique, PitchCirculateOptions } from './types'

const pitchCirculate: (notes: Note[], options: PitchCirculateOptions) => Note[][] =
    (
        notes: Note[],
        {
            technique,
            pitchClassCount = as.Cardinal(0),
            periodSize = as.Scalar<Scalar<Frequency>>(1),
        }: PitchCirculateOptions,
    ): Note[][] =>
        range(PITCH_CIRCULAR_TIER_COUNT)
            .map((integer: Integer) => as.Ordinal<PeriodSize[]>(integer))
            .map((tierIndex: Ordinal<PeriodSize[]>): Note[] =>
                technique === PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT ?
                    computeTierWithTechniqueIndexTranslationByPitchClassCount(notes, tierIndex, pitchClassCount) :
                    computeTierWithTechniqueScalarScalingByPeriodSize(notes, tierIndex, periodSize),
            )

export {
    pitchCirculate,
}
