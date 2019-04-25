import {
    as,
    Cents,
    centsTranslationToPitchScalar,
    Frequency,
    Hz,
    insteadOf,
    ofNotAs,
    Pitch,
    reciprocal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, frequency: Pitch) => Pitch =
    (sampleData: SampleData, frequency: Pitch): Pitch => {
        if (sampleData.unpitched) {
            return as.Point<Hz>(1)
        }

        const pitch: Pitch = use.Scalar(
            frequency,
            as.Scalar(ofNotAs(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        )
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0))

        return use.Scalar(
            pitch,
            insteadOf<Scalar, Pitch>(samplePitchScalar),
        )
    }

export {
    computePlaybackRate,
}
