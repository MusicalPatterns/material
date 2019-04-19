import {
    Amplitude,
    apply,
    Cardinal,
    E,
    Exponent,
    Frequency,
    from,
    Hz,
    Logarithm,
    negative,
    NormalScalar,
    ONE_HALF,
    Ordinal,
    Scalar,
    to,
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

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = apply.Exponent(
            E,
            negative(apply.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar(from.Logarithm<Scalar<Amplitude>>(pitchCircularBase))

        return to.NormalScalar<Amplitude>(from.Scalar(apply.Scalar(originalGainScalar, pitchCircularScaling)))
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

        const pitchCircularBase: Logarithm<Scalar<Amplitude>> = apply.Exponent(
            E,
            negative(apply.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar(from.Logarithm<Scalar<Amplitude>>(pitchCircularBase))

        return to.NormalScalar<Amplitude>(from.Scalar(apply.Scalar(originalGainScalar, pitchCircularScaling)))
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
