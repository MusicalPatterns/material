// tslint:disable max-file-line-count

import {
    apply,
    Base,
    Cardinal,
    DOUBLE,
    Frequency,
    from,
    Hz,
    Index,
    Power,
    quotient,
    Scalar,
    SQUARED,
    to,
} from '@musical-patterns/utilities'
import { KINDA_GUESSING_AT_A_GOOD_SIGMA, NEGATIVE_POINT_FIVE_TRANSLATION, PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters, WindowSize,
} from './types'

const computeNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Index<Hz>, pitchClassCount: Cardinal }) => number =
    (
        {
            pitchClassCount,
            circledPitchIndex,
        }: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Index<Hz> = to.Index<Hz>(from.Cardinal(apply.Scalar(
            pitchClassCount,
            to.Scalar(PITCH_CIRCULAR_TIER_COUNT),
        )))
        const circledPitchIndexProportionOfTotalPitchCount: number =
            from.Index<Hz>(quotient(circledPitchIndex, maximumPitchAcrossAllTiers))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchIndexProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Multiple(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computeNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize }) => number =
    (
        {
            windowSize,
            circledPitchScalar,
        }: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: WindowSize = apply.Power(
            windowSize,
            to.Power<Scalar<Scalar<Frequency>>>(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )
        const circledPitchScalarProportionOfTotalPitchCount: number =
            from.Scalar<Frequency>(apply.Base(
                circledPitchScalar,
                to.Base<Scalar<Frequency>>(from.Scalar<Scalar<Frequency>>(maximumPitchAcrossAllTiers)),
            ))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchScalarProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Multiple(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Index<Hz>, pitchClassCount: Cardinal }) => Power<Base> =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters): Power<Base> =>
        to.Power<Base>(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            from.Base(apply.Multiple(
                apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

const computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize }) => Power<Base> =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): Power<Base> =>
        to.Power<Base>(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters) /
            from.Base(apply.Multiple(
                apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

export {
    computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
}
