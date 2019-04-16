import { Amplitude, Cardinal, Frequency, Hz, Index, insteadOf, Scalar, to } from '@musical-patterns/utilities'
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
            const originalPitchIndex: Index<Hz> = insteadOf<Index, Hz>(note.pitch && note.pitch.index || to.Index(0))
            const originalGainScalar: Scalar<Amplitude> =
                insteadOf<Scalar, Amplitude>(note.gain && note.gain.scalar || to.Scalar(1))

            const circledPitchIndex: Index<Hz> = transposePitchIndexForTier(
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
                    scalar: insteadOf<Scalar, Scalar>(pitchCircledGainScalar),
                },
                pitch: {
                    ...note.pitch,
                    index: insteadOf<Index, Scalar>(circledPitchIndex),
                },
            }
        })

const computeTierWithTechniqueScalarScalingByWindowSize:
    (notes: Note[], tierIndex: Index, windowSize: Scalar<Scalar<Frequency>>) => Note[] =
    (notes: Note[], tierIndex: Index, windowSize: Scalar<Scalar<Frequency>>): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchScalar: Scalar<Frequency> =
                insteadOf<Scalar, Frequency>(note.pitch && note.pitch.scalar || to.Scalar(1))
            const originalGainScalar: Scalar<Amplitude> =
                insteadOf<Scalar, Amplitude>(note.gain && note.gain.scalar || to.Scalar(1))

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
                    scalar: insteadOf<Scalar, Scalar>(pitchCircledGainScalar),
                },
                pitch: {
                    ...note.pitch,
                    scalar: insteadOf<Scalar, Scalar>(circledPitchScalar),
                },
            }
        })

export {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
}
