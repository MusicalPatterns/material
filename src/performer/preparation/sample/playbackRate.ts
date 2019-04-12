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

const computePlaybackRate: (sampleData: SampleData, frequency: Hz) => Scalar<Hz> =
    (sampleData: SampleData, frequency: Hz): Scalar<Hz> => {
        if (sampleData.unpitched) {
            return to.Scalar(to.Hz(1))
        }

        const pitch: Scalar<Hz> = to.Scalar(apply.Scalar(
            frequency,
            to.Scalar(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5)),
        ))
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || to.Translation(to.Cents(0)))

        return apply.Scalar(
            pitch,
            to.Scalar(to.Scalar(to.Hz(from.Frequency(from.Scalar<Frequency, Scalar<Frequency>>(samplePitchScalar))))),
        )
    }

export {
    computePlaybackRate,
}
