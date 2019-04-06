import {
    apply,
    centsTranslationToPitchScalar,
    Frequency,
    from,
    Hz,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, frequency: Hz) => Scalar =
    (sampleData: SampleData, frequency: Hz): Scalar => {
        if (sampleData.unpitched) {
            return to.Scalar(1)
        }

        const pitch: Scalar<Hz> = to.Scalar(apply.Scalar(
            frequency,
            to.Scalar(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5)),
        ))
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || to.Translation(to.Cents(0)))

        return apply.Scalar(from.Hz(pitch), samplePitchScalar)
    }

export {
    computePlaybackRate,
}
