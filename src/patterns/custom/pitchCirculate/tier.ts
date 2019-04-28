import { as, Cardinal, Frequency, Gain, Hz, insteadOf, Ordinal, Pitch, Scalar } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSize,
} from './gainCurve'
import { scalePitchScalarForTier, transposePitchIndexForTier } from './pitchCurve'
import { PeriodSize } from './types'

const computeTierWithTechniqueIndexTranslationByPitchClassCount:
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, pitchClassCount: Cardinal) => Note[] =
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, pitchClassCount: Cardinal): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchIndex: Ordinal<Hz[]> =
                insteadOf<Ordinal, Hz[]>(note.pitch && note.pitch.index || as.Ordinal<Hz[]>(0))
            const originalGainScalar: Scalar<Gain> = note.gain && note.gain.scalar || as.Scalar<Gain>(1)

            const circledPitchIndex: Ordinal<Hz[]> = transposePitchIndexForTier(
                originalPitchIndex,
                { pitchClassCount, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Gain> =
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

const computeTierWithTechniqueScalarScalingByPeriodSize:
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, periodSize: PeriodSize) => Note[] =
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, periodSize: PeriodSize): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchScalar: Scalar<Frequency> =
                insteadOf<Scalar, Frequency>(note.pitch && note.pitch.scalar || as.Scalar(1))
            const originalGainScalar: Scalar<Gain> = note.gain && note.gain.scalar || as.Scalar<Gain>(1)

            const circledPitchScalar: Scalar<Frequency> = scalePitchScalarForTier(
                originalPitchScalar,
                { periodSize, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Gain> =
                applyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSize(
                    originalGainScalar,
                    { circledPitchScalar, periodSize },
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
    computeTierWithTechniqueScalarScalingByPeriodSize,
}
