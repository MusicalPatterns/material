import {
    as,
    Cents,
    centsTranslationToPitchScalar,
    Frequency,
    Hz,
    insteadOf,
    ofNotAs,
    Pitch,
    Point,
    reciprocal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, frequency: Point<Hz>) => Pitch =
    (sampleData: SampleData, frequency: Point<Hz>): Pitch => {
        if (sampleData.unpitched) {
            return as.Point<Hz>(1)
        }

        const pitch: Point<Hz> = use.Scalar(
            frequency,
            as.Scalar(ofNotAs(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        )
        const samplePitchScalar: Scalar<Frequency> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0))

        return use.Scalar(
            pitch,
            insteadOf<Scalar, Point<Hz>>(samplePitchScalar),
        )
    }

export {
    computePlaybackRate,
}
