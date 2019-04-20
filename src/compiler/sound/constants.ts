// tslint:disable no-magic-numbers

import { as, Integer, Ms, negative, Translation } from '@musical-patterns/utilities'

const DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN: Translation<Ms> = as.Translation<Ms>(negative(0.1))

const COMPILER_PRECISION: Integer = as.Integer(5)

export {
    COMPILER_PRECISION,
    DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN,
}
