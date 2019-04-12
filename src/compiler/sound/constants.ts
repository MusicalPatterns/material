// tslint:disable no-magic-numbers

import { Integer, Ms, negative, to, Translation } from '@musical-patterns/utilities'

const DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN: Translation<Ms> = to.Translation(to.Ms(negative(0.1)))

const COMPILER_PRECISION: Integer = to.Integer(5)

export {
    COMPILER_PRECISION,
    DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN,
}
