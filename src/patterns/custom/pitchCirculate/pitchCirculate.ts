import {
    Frequency,
    from,
    INITIAL,
    Integer,
    Ordinal,
    Scalar,
    slice,
    to,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import { PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
} from './tier'
import { PitchCircularTechnique, PitchCirculateOptions, WindowSize } from './types'

const pitchCirculate: (notes: Note[], options: PitchCirculateOptions) => Note[][] =
    (
        notes: Note[],
        {
            technique,
            pitchClassCount = to.Cardinal(0),
            windowSize = to.Scalar<Scalar<Frequency>>(1),
        }: PitchCirculateOptions,
    ): Note[][] =>
        slice(ZERO_AND_POSITIVE_INTEGERS, INITIAL, to.Ordinal(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))
            .map((integer: Integer) => to.Ordinal<WindowSize>(integer))
            .map((tierIndex: Ordinal<WindowSize>): Note[] =>
                technique === PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT ?
                    computeTierWithTechniqueIndexTranslationByPitchClassCount(notes, tierIndex, pitchClassCount) :
                    computeTierWithTechniqueScalarScalingByWindowSize(notes, tierIndex, windowSize),
            )

export {
    pitchCirculate,
}
