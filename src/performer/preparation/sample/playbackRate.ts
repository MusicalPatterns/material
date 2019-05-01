import { as, Cents, centsTranslationToPitchScalar, musicalAs, quotient, Tone, use } from '@musical-patterns/utilities'
import { STANDARDIZED_SAMPLE_PITCH_OF_C5 } from './constants'
import { SampleData } from './types'

const computePlaybackRate: (sampleData: SampleData, tone: Tone) => Tone =
    (sampleData: SampleData, tone: Tone): Tone => {
        if (sampleData.unpitched) {
            return musicalAs.Tone(1)
        }

        const sampleToneScalar: Tone = musicalAs.Tone(as.number(
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0)),
        ))

        return use.Scalar(
            sampleToneScalar,
            quotient(tone, STANDARDIZED_SAMPLE_PITCH_OF_C5),
        )
    }

export {
    computePlaybackRate,
}
