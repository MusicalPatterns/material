import {
    as,
    Cents,
    centsTranslationToPitchScalar,
    musicalAs,
    Pitch,
    reciprocal,
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

        const pitch: Pitch = musicalAs.Pitch(use.Scalar(
            as.number(tone),
            as.Scalar(as.number(reciprocal(STANDARDIZED_SAMPLE_PITCH_OF_C5))),
        ))
        const sampleToneScalar: Scalar<Pitch> =
            centsTranslationToPitchScalar(sampleData.centsTranslation || as.Translation<Cents>(0))

        return musicalAs.Tone(as.number(use.Scalar(pitch, sampleToneScalar)))
    }

export {
    computePlaybackRate,
}
