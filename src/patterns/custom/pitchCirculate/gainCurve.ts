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
    NormalScalar,
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
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Base<NormalScalar<Amplitude>> = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<NormalScalar<Amplitude>> =
            to.Scalar(from.Base<NormalScalar<Amplitude>>(pitchCircularBase))

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
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Base<NormalScalar<Amplitude>> = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )
        const pitchCircularScaling: Scalar<NormalScalar<Amplitude>> =
            to.Scalar(from.Base<NormalScalar<Amplitude>>(pitchCircularBase))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
