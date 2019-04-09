import { from, INITIAL, Ordinal, slice, to, ZERO_AND_POSITIVE_INTEGERS } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import { PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
} from './tier'
import { PitchCircularTechnique, PitchCirculateOptions } from './types'

const pitchCirculate: (notes: Note[], options: PitchCirculateOptions) => Note[][] =
    (notes: Note[], options: PitchCirculateOptions): Note[][] => {
        const { technique, pitchClassCount = to.Cardinal(0), windowSize = to.Scalar(to.Frequency(1)) } = options

        return slice(ZERO_AND_POSITIVE_INTEGERS, INITIAL, to.Ordinal(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))
            .map(to.Ordinal)
            .map((tierIndex: Ordinal): Note[] =>
                technique === PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT ?
                    computeTierWithTechniqueIndexTranslationByPitchClassCount(notes, tierIndex, pitchClassCount) :
                    computeTierWithTechniqueScalarScalingByWindowSize(notes, tierIndex, windowSize),
            )
    }

export {
    pitchCirculate,
}
