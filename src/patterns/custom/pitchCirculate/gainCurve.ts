import {
    as,
    Cardinal,
    E,
    Exponent,
    Frequency,
    Gain,
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
        originalGainScalar: Scalar<Gain>,
        parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal },
    ) => Scalar<Gain> =
    (
        originalGainScalar: Scalar<Gain>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Gain> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Logarithm<Scalar<Gain>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Gain>> =
            as.Scalar<Scalar<Gain>>(notAs.Logarithm(pitchCircularBase))

        return use.Scalar(originalGainScalar, pitchCircularScaling)
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize:
    (
        originalGainScalar: Scalar<Gain>,
        parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize },
    ) => Scalar<Gain> =
    (
        originalGainScalar: Scalar<Gain>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): Scalar<Gain> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Logarithm<Scalar<Gain>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Gain>> =
            as.Scalar<Scalar<Gain>>(notAs.Logarithm(pitchCircularBase))

        return as.Scalar<Gain>(notAs.Scalar(use.Scalar(originalGainScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
