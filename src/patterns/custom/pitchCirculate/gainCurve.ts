import {
    Amplitude,
    apply,
    Base,
    Cardinal,
    E,
    Frequency,
    from,
    Hz,
    negative,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import {
    computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
} from './normalDistributionPower'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters, WindowSize,
} from './types'

const applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: { circledPitchIndex: Ordinal<Hz>, pitchClassCount: Cardinal },
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Base<Scalar<Amplitude>> = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar<Scalar<Amplitude>>(from.Base<Scalar<Amplitude>>(pitchCircularBase))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
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
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Base<Scalar<Amplitude>> = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar<Scalar<Amplitude>>(from.Base<Scalar<Amplitude>>(pitchCircularBase))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
