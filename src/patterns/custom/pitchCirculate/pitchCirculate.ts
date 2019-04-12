import { from, Index, INITIAL, slice, to, ZERO_AND_POSITIVE_INTEGERS } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import { PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
} from './tier'
import { PitchCircularTechnique, PitchCirculateOptions } from './types'

const pitchCirculate: (notes: Note[], options: PitchCirculateOptions) => Note[][] =
    (
        notes: Note[],
        {
            technique,
            pitchClassCount = to.Cardinal(0),
            windowSize = to.Scalar(to.Scalar(to.Frequency(1))),
        }: PitchCirculateOptions,
    ): Note[][] =>
        slice(ZERO_AND_POSITIVE_INTEGERS, INITIAL, to.Index(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))
            .map(to.Index)
            .map((tierIndex: Index): Note[] =>
                technique === PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT ?
                    computeTierWithTechniqueIndexTranslationByPitchClassCount(notes, tierIndex, pitchClassCount) :
                    computeTierWithTechniqueScalarScalingByWindowSize(notes, tierIndex, windowSize),
            )

export {
    pitchCirculate,
}
