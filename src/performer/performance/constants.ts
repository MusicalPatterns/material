// tslint:disable no-magic-numbers

import { Ms, negative, Ordinal, to } from '@musical-patterns/utilities'
import { Sound } from '../types'

const NON_SEGNO_INDEX: Ordinal<Sound> = to.Ordinal<Sound>(negative(1))
const NON_SEGNO_TIME: Ms = to.Ms(negative(1))

export {
    NON_SEGNO_INDEX,
    NON_SEGNO_TIME,
}
