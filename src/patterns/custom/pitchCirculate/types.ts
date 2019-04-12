import { Cardinal, Frequency, Index, Scalar } from '@musical-patterns/utilities'

enum PitchCircularTechnique {
    INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT = 'INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT',
    SCALAR_SCALING_BY_WINDOW_SIZE = 'SCALAR_SCALING_BY_WINDOW_SIZE',
}

interface PitchCirculateOptions {
    pitchClassCount?: Cardinal,
    technique: PitchCircularTechnique,
    windowSize?: Scalar<Scalar<Frequency>>,
}

interface ComputeCircledPitchIndexParameters {
    pitchClassCount: Cardinal,
    tierIndex: Index,
}

interface ComputeCircledPitchScalarParameters {
    tierIndex: Index,
    windowSize: Scalar<Scalar<Frequency>>,
}

interface ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters {
    circledPitchIndex: Index,
    pitchClassCount: Cardinal,
}

interface ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters {
    circledPitchScalar: Scalar<Frequency>,
    windowSize: Scalar<Frequency>,
}

export {
    PitchCircularTechnique,
    PitchCirculateOptions,
    ComputeCircledPitchIndexParameters,
    ComputeCircledPitchScalarParameters,
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
}
