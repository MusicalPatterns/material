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

        const pitchCircularBase: Logarithm<NormalScalar<Amplitude>> = apply.Exponent(
            E,
            negative(apply.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<NormalScalar<Amplitude>> =
            to.Scalar(from.Logarithm<NormalScalar<Amplitude>>(pitchCircularBase))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
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

        const pitchCircularBase: Logarithm<NormalScalar<Amplitude>> = apply.Exponent(
            E,
            negative(apply.Scalar(normalDistributionExponent, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<NormalScalar<Amplitude>> =
            to.Scalar(from.Logarithm<NormalScalar<Amplitude>>(pitchCircularBase))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
