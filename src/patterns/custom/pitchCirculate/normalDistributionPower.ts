// tslint:disable max-file-line-count

import {
    apply,
    Base,
    Cardinal,
    DOUBLE,
    Frequency,
    from,
    Index,
    Multiple,
    Power,
    quotient,
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
    (parameters: { circledPitchIndex: Index, pitchClassCount: Cardinal }) => number =
    (
        {
            pitchClassCount,
            circledPitchIndex,
        }: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Index = to.Index(from.Cardinal(apply.Scalar(
            pitchClassCount,
            to.Scalar(PITCH_CIRCULAR_TIER_COUNT),
        )))
        const circledPitchIndexProportionOfTotalPitchCount: number =
            from.Index<number, Index>(from.Scalar(quotient(circledPitchIndex, maximumPitchAcrossAllTiers)))
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
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: Scalar<Frequency> }) => number =
    (
        {
            windowSize,
            circledPitchScalar,
        }: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Scalar<Frequency> = apply.Power(
            windowSize,
            to.Power(to.Scalar(to.Frequency(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))),
        )
        const circledPitchScalarProportionOfTotalPitchCount: number =
            from.Scalar(from.Frequency<Scalar, Scalar<Frequency>>(apply.Base(
                circledPitchScalar,
                to.Base(maximumPitchAcrossAllTiers),
            )))
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
    (parameters: { circledPitchIndex: Index, pitchClassCount: Cardinal }) => Power<Base> =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters): Power<Base> =>
        to.Power(to.Base(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            from.Base(apply.Multiple(
                apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED as Power<Base>),
                DOUBLE as Multiple<Base>,
            )),
        ))

const computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: Scalar<Frequency> }) => Power<Base> =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): Power<Base> =>
        to.Power(to.Base(
            computeNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters) /
            from.Base(apply.Multiple(
                apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED as Power<Base>),
                DOUBLE as Multiple<Base>,
            )),
        ))

export {
    computePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
}
