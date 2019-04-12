import {
    Amplitude,
    apply,
    Base,
    Cardinal,
    E,
    Frequency,
    from,
    Index,
    negative,
    ONE_HALF,
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
} from './types'

const applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: { circledPitchIndex: Index, pitchClassCount: Cardinal },
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularBase: Base = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF as Scalar<Power<Base>>)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar(to.Scalar(to.Amplitude(from.Base<number, Base>(pitchCircularBase))))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: Scalar<Frequency> },
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionPower: Power<Base> =
            computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

        const pitchCircularBase: Base = apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF as Scalar<Power<Base>>)),
        )
        const pitchCircularScaling: Scalar<Scalar<Amplitude>> =
            to.Scalar(to.Scalar(to.Amplitude(from.Base<number, Base>(pitchCircularBase))))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

export {
    applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount,
    applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize,
}
