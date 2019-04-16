import {
    apply,
    Cents,
    centsTranslationToPitchScalar,
    Frequency,
    Hz,
    insteadOf,
    ofUnits,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, frequency: Hz) => Scalar<Hz> =
    (sampleData: SampleData, frequency: Hz): Scalar<Hz> => {
        if (sampleData.unpitched) {
            return to.Scalar<Hz>(1)
        }

        const pitch: Scalar<Hz> = to.Scalar(ofUnits<'Hz'>(apply.Scalar(
            frequency,
            to.Scalar(ofUnits<'Hz'>(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        )))
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || to.Translation<Cents>(0))

        return apply.Scalar(
            pitch,
            insteadOf<Scalar, Scalar<Hz>>(samplePitchScalar),
        )
    }

export {
    computePlaybackRate,
}
