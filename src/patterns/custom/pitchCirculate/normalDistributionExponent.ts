// tslint:disable max-file-line-count

import {
    as,
    Cardinal,
    DOUBLE,
    Exponent,
    Frequency,
    Hz,
    Logarithm,

    ofNotAs,
    Ordinal,
    quotient,
    Scalar,
    SQUARED,
    use,
} from '@musical-patterns/utilities'
import { KINDA_GUESSING_AT_A_GOOD_SIGMA, NEGATIVE_POINT_FIVE_TRANSLATION, PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    WindowSize,
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

const computeNumeratorOfExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize }) => number =
    (
        {
            windowSize,
            circledPitchScalar,
        }: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): number => {
        const maximumPitchAcrossAllTiers: WindowSize = use.Exponent(
            windowSize,
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
    (parameters: { circledPitchIndex: Ordinal<Hz[]>, pitchClassCount: Cardinal }) => Exponent<Logarithm> =
    (
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Exponent<Logarithm> =>
        as.Exponent<Logarithm>(
            computeNumeratorOfExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            as.number(use.Multiple(
                use.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

const computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: { circledPitchScalar: Scalar<Frequency>, windowSize: WindowSize }) => Exponent<Logarithm> =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): Exponent<Logarithm> =>
        as.Exponent<Logarithm>(
            computeNumeratorOfExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters) /
            as.number(use.Multiple(
                use.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED),
                DOUBLE,
            )),
        )

export {
    computeExponentOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount,
    computeExponentOfNormalDistributionWithTechniqueScalarScalingByWindowSize,
}
