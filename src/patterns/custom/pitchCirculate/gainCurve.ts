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
        originalGainScalar: Scalar<Amplitude>,
        parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal },
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            as.Scalar<Scalar<Amplitude>>(notAs.Logarithm(pitchCircularBase))

        return use.Scalar(originalGainScalar, pitchCircularScaling)
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize },
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            as.Scalar<Scalar<Amplitude>>(notAs.Logarithm(pitchCircularBase))

        return as.Scalar<Amplitude>(notAs.Scalar(use.Scalar(originalGainScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
