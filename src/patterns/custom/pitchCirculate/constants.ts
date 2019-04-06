// tslint:disable no-magic-numbers

import {
    apply,
    Base,
    Cardinal,
    from,
    negative,
    reciprocal,
    SQUARE_ROOT_OF_TWO,
    to,
    Translation,
} from '@musical-patterns/utilities'

const PITCH_CIRCULAR_TIER_COUNT: Cardinal = to.Cardinal(3)
const NEGATIVE_POINT_FIVE_TRANSLATION: Translation = negative(to.Translation(0.5))
const KINDA_GUESSING_AT_A_GOOD_SIGMA: Base = to.Base(apply.Scalar(
    reciprocal(SQUARE_ROOT_OF_TWO),
    to.Scalar(from.Cardinal(reciprocal(PITCH_CIRCULAR_TIER_COUNT))),
))

export {
    PITCH_CIRCULAR_TIER_COUNT,
    NEGATIVE_POINT_FIVE_TRANSLATION,
    KINDA_GUESSING_AT_A_GOOD_SIGMA,
}
