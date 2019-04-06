import {
    apply,
    Cardinal,
    DOUBLE,
    Frequency,
    from,
    Ordinal,
    Power,
    Scalar,
    SQUARED,
    to,
} from '@musical-patterns/utilities'
import { KINDA_GUESSING_AT_A_GOOD_SIGMA, NEGATIVE_POINT_FIVE_TRANSLATION, PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
} from './types'

const computeNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Ordinal, pitchClassCount: Cardinal }) => number =
    (
        {
            pitchClassCount,
            circledPitchIndex,
        }: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Ordinal = to.Ordinal(from.Cardinal(apply.Scalar(
            pitchClassCount,
            to.Scalar(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )))
        const circledPitchIndexProportionOfTotalPitchCount: number = circledPitchIndex / maximumPitchAcrossAllTiers
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchIndexProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Scalar(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computeNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: Scalar<Frequency> }) => number =
    (
        {
            windowSize,
            circledPitchScalar,
        }: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Scalar<Frequency> = apply.Power(
            windowSize,
            to.Power(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )
        const circledPitchScalarProportionOfTotalPitchCount: number =
            from.Scalar(from.Frequency<Scalar, Scalar<Frequency>>(apply.Base(
                circledPitchScalar,
                to.Base(from.Scalar<Frequency, Scalar<Frequency>>(maximumPitchAcrossAllTiers)),
            )))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchScalarProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Scalar(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Ordinal, pitchClassCount: Cardinal }) => Power =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters): Power =>
        to.Power(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            from.Base(apply.Scalar(apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED), DOUBLE)),
        )

const computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: Scalar<Frequency> }) => Power =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): Power =>
        to.Power(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters) /
            from.Base(apply.Scalar(apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED), DOUBLE)),
        )

export {
    computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
}
