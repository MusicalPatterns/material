import { Amplitude, as, Cardinal, Frequency, Hz, insteadOf, Ordinal, Pitch, Scalar } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
} from './gainCurve'
import { scalePitchScalarForTier, transposePitchIndexForTier } from './pitchCurve'
import { WindowSize } from './types'

const computeTierWithTechniqueIndexTranslationByPitchClassCount:
    (notes: Note[], tierIndex: Ordinal<WindowSize[]>, pitchClassCount: Cardinal) => Note[] =
    (notes: Note[], tierIndex: Ordinal<WindowSize[]>, pitchClassCount: Cardinal): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchIndex: Ordinal<Hz[]> =
                insteadOf<Ordinal, Hz[]>(note.pitch && note.pitch.index || as.Ordinal<Hz[]>(0))
            const originalGainScalar: Scalar<Amplitude> = note.gain && note.gain.scalar || as.Scalar<Amplitude>(1)

            const circledPitchIndex: Ordinal<Hz[]> = transposePitchIndexForTier(
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
                    scalar: pitchCircledGainScalar,
                },
                pitch: {
                    ...note.pitch,
                    index: insteadOf<Ordinal, Array<Scalar<Pitch>>>(circledPitchIndex),
                },
            }
        })

const computeTierWithTechniqueScalarScalingByWindowSize:
    (notes: Note[], tierIndex: Ordinal<WindowSize[]>, windowSize: WindowSize) => Note[] =
    (notes: Note[], tierIndex: Ordinal<WindowSize[]>, windowSize: WindowSize): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchScalar: Scalar<Frequency> =
                insteadOf<Scalar, Frequency>(note.pitch && note.pitch.scalar || as.Scalar(1))
            const originalGainScalar: Scalar<Amplitude> = note.gain && note.gain.scalar || as.Scalar<Amplitude>(1)

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
                    scalar: pitchCircledGainScalar,
                },
                pitch: {
                    ...note.pitch,
                    scalar: insteadOf<Scalar, Pitch>(circledPitchScalar),
                },
            }
        })

export {
    computeTierWithTechniqueIndexTranslationByPitchClassCount,
    computeTierWithTechniqueScalarScalingByWindowSize,
}
