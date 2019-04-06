import { Cardinal, Frequency, Ordinal, Scalar } from '@musical-patterns/utilities'

enum PitchCircularTechnique {
    INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT = 'INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT',
    SCALAR_SCALING_BY_WINDOW_SIZE = 'SCALAR_SCALING_BY_WINDOW_SIZE',
}

interface PitchCirculateOptions {
    pitchClassCount?: Cardinal,
    technique: PitchCircularTechnique,
    windowSize?: Scalar<Frequency>,
}

interface ComputeCircledPitchIndexParameters {
    pitchClassCount: Cardinal,
    tierIndex: Ordinal,
}

interface ComputeCircledPitchScalarParameters {
    tierIndex: Ordinal,
    windowSize: Scalar<Frequency>,
}

interface ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters {
    circledPitchIndex: Ordinal,
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
