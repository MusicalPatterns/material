import { Cardinal, Frequency, Hz, Ordinal, Scalar } from '@musical-patterns/utilities'

enum PitchCircularTechnique {
    INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT = 'INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT',
    SCALAR_SCALING_BY_WINDOW_SIZE = 'SCALAR_SCALING_BY_WINDOW_SIZE',
}

interface PitchCirculateOptions {
    pitchClassCount?: Cardinal,
    technique: PitchCircularTechnique,
    windowSize?: WindowSize,
}

interface ComputeCircledPitchIndexParameters {
    pitchClassCount: Cardinal,
    tierIndex: Ordinal<WindowSize[]>,
}

interface ComputeCircledPitchScalarParameters {
    tierIndex: Ordinal<WindowSize[]>,
    windowSize: WindowSize,
}

interface ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters {
    circledPitchIndex: Ordinal<Hz[]>,
    pitchClassCount: Cardinal,
}

interface ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters {
    circledPitchScalar: Scalar<Frequency>,
    windowSize: WindowSize,
}

type WindowSize = Scalar<Scalar<Frequency>>

export {
    PitchCircularTechnique,
    PitchCirculateOptions,
    ComputeCircledPitchIndexParameters,
    ComputeCircledPitchScalarParameters,
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    WindowSize,
}
