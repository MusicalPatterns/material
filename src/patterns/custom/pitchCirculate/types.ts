import { Cardinal, Hz, Ordinal, Pitch, Scalar } from '@musical-patterns/utilities'

enum PitchCircularTechnique {
    INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT = 'INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT',
    SCALAR_SCALING_BY_PERIOD_SIZE = 'SCALAR_SCALING_BY_PERIOD_SIZE',
}

interface PitchCirculateOptions {
    periodSize?: PeriodSize,
    pitchClassCount?: Cardinal,
    technique: PitchCircularTechnique,
}

interface ComputeCircledPitchIndexParameters {
    pitchClassCount: Cardinal,
    tierIndex: Ordinal<PeriodSize[]>,
}

interface ComputeCircledPitchScalarParameters {
    periodSize: PeriodSize,
    tierIndex: Ordinal<PeriodSize[]>,
}

interface ApplyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCountParameters {
    circledPitchIndex: Ordinal<Hz[]>,
    pitchClassCount: Cardinal,
}

interface ApplyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSizeParameters {
    circledPitchScalar: Scalar<Pitch>,
    periodSize: PeriodSize,
}

type PeriodSize = Scalar<Scalar<Pitch>>

export {
    PitchCircularTechnique,
    PitchCirculateOptions,
    ComputeCircledPitchIndexParameters,
    ComputeCircledPitchScalarParameters,
    ApplyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    PeriodSize,
}
