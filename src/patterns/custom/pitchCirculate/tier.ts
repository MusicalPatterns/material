import { Amplitude, Cardinal, Frequency, from, Index, Scalar, to } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
} from './gainCurve'
import { scalePitchScalarForTier, transposePitchIndexForTier } from './pitchCurve'

const computeTierWithTechniqueIndexTranslationByPitchClassCount:
    (notes: Note[], tierIndex: Index, pitchClassCount: Cardinal) => Note[] =
    (notes: Note[], tierIndex: Index, pitchClassCount: Cardinal): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchIndex: Index = note.pitch && note.pitch.index || to.Index(0)
            const originalGainScalar: Scalar<Amplitude> =
                to.Amplitude(note.gain && note.gain.scalar || to.Scalar(1))

            const circledPitchIndex: Index = transposePitchIndexForTier(
                originalPitchIndex,
                { pitchClassCount, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Amplitude> =
                applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount(
                    originalGainScalar,
                    { circledPitchIndex, pitchClassCount },
                )

            return {
                ...note,
                gain: {
                    ...note.gain,
                    scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(pitchCircledGainScalar),
                },
                pitch: {
                    ...note.pitch,
                    index: circledPitchIndex,
                },
            }
        })

const computeTierWithTechniqueScalarScalingByWindowSize:
    (notes: Note[], tierIndex: Index, windowSize: Scalar<Scalar<Frequency>>) => Note[] =
    (notes: Note[], tierIndex: Index, windowSize: Scalar<Scalar<Frequency>>): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchScalar: Scalar<Frequency> =
                to.Frequency(note.pitch && note.pitch.scalar || to.Scalar(1))
            const originalGainScalar: Scalar<Amplitude> =
                to.Amplitude(note.gain && note.gain.scalar || to.Scalar(1))

            const circledPitchScalar: Scalar<Frequency> = scalePitchScalarForTier(
                originalPitchScalar,
                { windowSize, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Amplitude> =
                applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize(
                    originalGainScalar,
                    { circledPitchScalar, windowSize },
                )

            return {
                ...note,
                gain: {
                    ...note.gain,
                    scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(pitchCircledGainScalar),
                },
                pitch: {
                    ...note.pitch,
                    scalar: from.Frequency<Scalar, Scalar<Frequency>>(circledPitchScalar),
                },
            }
        })

export {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
}
