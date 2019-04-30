import { as, Cardinal, Hz, insteadOf, Intensity, Ordinal, Pitch, Scalar } from '@musical-patterns/utilities'
import { Note } from '../../../compiler'
import {
    applyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSize,
} from './intensityCurve'
import { scalePitchScalarForTier, transposePitchIndexForTier } from './pitchCurve'
import { PeriodSize } from './types'

const computeTierWithTechniqueIndexTranslationByPitchClassCount:
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, pitchClassCount: Cardinal) => Note[] =
    (notes: Note[], tierIndex: Ordinal<PeriodSize[]>, pitchClassCount: Cardinal): Note[] =>
        notes.map((note: Note): Note => {
            const originalPitchIndex: Ordinal<Hz[]> =
                insteadOf<Ordinal, Hz[]>(note.pitch && note.pitch.index || as.Ordinal<Hz[]>(0))
            const originalIntensityScalar: Scalar<Intensity> =
                note.intensity && note.intensity.scalar || as.Scalar<Intensity>(1)

            const circledPitchIndex: Ordinal<Hz[]> = transposePitchIndexForTier(
                originalPitchIndex,
                { pitchClassCount, tierIndex },
            )

            const pitchCircledIntensityScalar: Scalar<Intensity> =
                applyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCount(
                    originalIntensityScalar,
                    { circledPitchIndex, pitchClassCount },
                )

            return {
                ...note,
                intensity: {
                    ...note.intensity,
                    scalar: pitchCircledIntensityScalar,
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
            const originalPitchScalar: Scalar<Pitch> =
                insteadOf<Scalar, Pitch>(note.pitch && note.pitch.scalar || as.Scalar(1))
            const originalIntensityScalar: Scalar<Intensity> =
                note.intensity && note.intensity.scalar || as.Scalar<Intensity>(1)

            const circledPitchScalar: Scalar<Pitch> = scalePitchScalarForTier(
                originalPitchScalar,
                { periodSize, tierIndex },
            )

            const pitchCircledIntensityScalar: Scalar<Intensity> =
                applyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSize(
                    originalIntensityScalar,
                    { circledPitchScalar, periodSize },
                )

            return {
                ...note,
                intensity: {
                    ...note.intensity,
                    scalar: pitchCircledIntensityScalar,
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
