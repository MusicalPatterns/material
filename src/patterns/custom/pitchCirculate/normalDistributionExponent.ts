// tslint:disable max-file-line-count

import {
    as,
    Cardinal,
    DOUBLE,
    Exponent,
    Frequency,
    Hz,
    ofNotAs,
    Ordinal,
    pow,
    quotient,
    Scalar,
    SQUARED,
    use,
} from '@musical-patterns/utilities'
import { KINDA_GUESSING_AT_A_GOOD_SIGMA, NEGATIVE_POINT_FIVE_TRANSLATION, PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    PeriodSize,
} from './types'

const computeNumeratorOfExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal }) => number =
    (
        {
            pitchClassCount,
            circledPitchIndex,
        }: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: Ordinal<Hz[]> = as.Ordinal<Hz[]>(as.number(use.Multiple(
            pitchClassCount,
            as.Multiple(ofNotAs(PITCH_CIRCULAR_TIER_COUNT)),
        )))
        const circledPitchIndexProportionOfTotalPitchCount: number =
            as.number(quotient(circledPitchIndex, maximumPitchAcrossAllTiers))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            use.Translation(circledPitchIndexProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = use.Multiple(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return use.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computeNumeratorOfExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, periodSize: PeriodSize }) => number =
    (
        {
            periodSize,
            circledPitchScalar,
        }: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: PeriodSize = use.Exponent(
            periodSize,
            as.Exponent<Scalar<Scalar<Frequency>>>(as.number(PITCH_CIRCULAR_TIER_COUNT)),
        )
        const circledPitchScalarProportionOfTotalPitchCount: number =
            as.number(use.Base(
                circledPitchScalar,
                as.Base<Scalar<Frequency>>(as.number(maximumPitchAcrossAllTiers)),
            ))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            use.Translation(circledPitchScalarProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = use.Multiple(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return use.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal }) => Exponent =
    (
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Exponent =>
        as.Exponent(
            computeNumeratorOfExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            as.number(use.Multiple(
                pow(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

const computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, periodSize: PeriodSize }) => Exponent =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByPeriodSizeParameters): Exponent =>
        as.Exponent(
            computeNumeratorOfExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize(parameters) /
            as.number(use.Multiple(
                pow(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

export {
    computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computeExponentOfNormalDistributionWithTechniqueScalarScalingByPeriodSize,
}
