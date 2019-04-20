import {
    Amplitude,
    as,
    Cardinal,
    E,
    Exponent,
    Frequency,
    Hz,
    Logarithm,
    negative,
    NormalScalar,
    notAs,
    ONE_HALF,
    Ordinal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import {
    computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
} from './normalDistributionExponent'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    WindowSize,
} from './types'

const applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount:
    (
        originalGainScalar: NormalScalar<Amplitude>,
        parameters: { circledPitchIndex: Ordinal<Hz>, pitchClassCount: Cardinal },
    ) => NormalScalar<Amplitude> =
    (
        originalGainScalar: NormalScalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): NormalScalar<Amplitude> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            as.Scalar<Scalar<Amplitude>>(notAs.Logarithm(pitchCircularBase))

        return as.NormalScalar<Amplitude>(notAs.Scalar(use.Scalar(originalGainScalar, pitchCircularScaling)))
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize:
    (
        originalGainScalar: NormalScalar<Amplitude>,
        parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize },
    ) => NormalScalar<Amplitude> =
    (
        originalGainScalar: NormalScalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): NormalScalar<Amplitude> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            as.Scalar<Scalar<Amplitude>>(notAs.Logarithm(pitchCircularBase))

        return as.NormalScalar<Amplitude>(notAs.Scalar(use.Scalar(originalGainScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
