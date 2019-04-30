import {
    as,
    Cardinal,
    E,
    Exponent,
    Hz,
    Intensity,
    Logarithm,
    negative,
    ONE_HALF,
    Ordinal,
    Pitch,
    pow,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import {
    computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize,
} from './normalDistributionExponent'
import {
    ApplyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    PeriodSize,
} from './types'

const applyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCount:
    (
        originalIntensityScalar: Scalar<Intensity>,
        parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal },
    ) => Scalar<Intensity> =
    (
        originalIntensityScalar: Scalar<Intensity>,
        parameters: ApplyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Intensity> => {
        const normalDistributionExponent: Exponent =
            computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Logarithm<Scalar<Intensity>> = as.Logarithm<Scalar<Intensity>>(pow(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        ))
        const pitchCircularScaling: Scalar<Scalar<Intensity>> =
            as.Scalar<Scalar<Intensity>>(as.number(pitchCircularBase))

        return use.Scalar(originalIntensityScalar, pitchCircularScaling)
    }

const applyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSize:
    (
        originalIntensityScalar: Scalar<Intensity>,
        parameters: { circledPitchScalar: Scalar<Pitch>, periodSize: PeriodSize },
    ) => Scalar<Intensity> =
    (
        originalIntensityScalar: Scalar<Intensity>,
        parameters: ApplyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    ): Scalar<Intensity> => {
        const normalDistributionExponent: Exponent =
            computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize(parameters)

        const pitchCircularBase: Logarithm<Scalar<Intensity>> = as.Logarithm<Scalar<Intensity>>(pow(
            E,
            negative(use.Scalar(normalDistributionExponent, ONE_HALF)),
        ))
        const pitchCircularScaling: Scalar<Scalar<Intensity>> =
            as.Scalar<Scalar<Intensity>>(as.number(pitchCircularBase))

        return as.Scalar<Intensity>(as.number(use.Scalar(originalIntensityScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularIntensityCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularIntensityCurveWithTechniqueScalarScalingByPeriodSize,
}
