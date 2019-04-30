import {
    as,
    Cents,
    centsTranslationToPitchScalar,
    insteadOf,
    musicalAs,
    product,
    Scalar,
    Tone,
    use,
} from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, tone: Tone) => Tone =
    (sampleData: SampleData, tone: Tone): Tone => {
        if (sampleData.unpitched) {
            return musicalAs.Tone(1)
        }

        const sampleToneScalar: Scalar<Tone> = insteadOf<Scalar, Tone>(
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0)),
        )

        return use.Scalar(
            product(tone, STANDARDIZED_SAMPLE_PITCH_OF_C5),
            sampleToneScalar,
        )
    }

export {
    computePlaybackRate,
}
