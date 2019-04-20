import {
    as,
    Cents,
    centsTranslationToPitchScalar,
    Frequency,
    Hz,
    insteadOf,
    ofNotAs,
    reciprocal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, frequency: Hz) => Scalar<Hz> =
    (sampleData: SampleData, frequency: Hz): Scalar<Hz> => {
        if (sampleData.unpitched) {
            return as.Scalar<Hz>(1)
        }

        const pitch: Scalar<Hz> = as.Scalar(ofNotAs(use.Scalar(
            frequency,
            as.Scalar(ofNotAs(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        )))
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0))

        return use.Scalar(
            pitch,
            insteadOf<Scalar, Scalar<Hz>>(samplePitchScalar),
        )
    }

export {
    computePlaybackRate,
}
