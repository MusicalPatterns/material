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

    ONE_HALF,
    Ordinal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import {
    computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize,
} from './normalDistributionExponent'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    PeriodSize,
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
            as.Scalar<Scalar<Gain>>(as.number(pitchCircularBase))

        return use.Scalar(originalGainScalar, pitchCircularScaling)
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSize:
    (
        originalGainScalar: Scalar<Gain>,
        parameters: { circledPitchScalar: Scalar<Frequency>, periodSize: PeriodSize },
    ) => Scalar<Gain> =
    (
        originalGainScalar: Scalar<Gain>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    ): Scalar<Gain> => {
        const normalDistributionExponent: Exponent<Logarithm> =
            computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize(parameters)

        const pitchCircularBase: Logarithm<Scalar<Gain>> = use.Exponent(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Gain>> =
            as.Scalar<Scalar<Gain>>(as.number(pitchCircularBase))

        return as.Scalar<Gain>(as.number(use.Scalar(originalGainScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSize,
}
