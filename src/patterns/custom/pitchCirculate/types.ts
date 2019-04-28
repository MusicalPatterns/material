import { Cardinal, Frequency, Hz, Ordinal, Scalar } from '@musical-patterns/utilities'

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

interface ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters {
    circledPitchIndex: Ordinal<Hz[]>,
    pitchClassCount: Cardinal,
}

interface ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters {
    circledPitchScalar: Scalar<Frequency>,
    periodSize: PeriodSize,
}

type PeriodSize = Scalar<Scalar<Frequency>>

export {
    PitchCircularTechnique,
    PitchCirculateOptions,
    ComputeCircledPitchIndexParameters,
    ComputeCircledPitchScalarParameters,
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    PeriodSize,
}
