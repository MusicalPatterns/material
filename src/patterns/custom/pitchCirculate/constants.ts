// tslint:disable no-magic-numbers

import {
    as,
    Cardinal,
    Logarithm,
    negative,
    notAs,
    reciprocal,
    SQUARE_ROOT_OF_TWO,
    Translation,
    use,
} from '@musical-patterns/utilities'

const PITCH_CIRCULAR_TIER_COUNT: Cardinal = as.Cardinal(3)
const NEGATIVE_POINT_FIVE_TRANSLATION: Translation = negative(as.Translation(0.5))
const KINDA_GUESSING_AT_A_GOOD_SIGMA: Logarithm = as.Logarithm(use.Scalar(
    reciprocal(SQUARE_ROOT_OF_TWO),
    as.Scalar(notAs.Translation(reciprocal(PITCH_CIRCULAR_TIER_COUNT))),
))

export {
    PITCH_CIRCULAR_TIER_COUNT,
    NEGATIVE_POINT_FIVE_TRANSLATION,
    KINDA_GUESSING_AT_A_GOOD_SIGMA,
}
