// tslint:disable no-magic-numbers

import { as, Ms, negative, Ordinal, Point } from '@musical-patterns/utilities'
import { Sound } from '../types'

const NON_SEGNO_INDEX: Ordinal<Sound[]> = as.Ordinal<Sound[]>(negative(1))
const NON_SEGNO_TIME: Point<Ms> = as.Point<Ms>(negative(1))

export {
    NON_SEGNO_INDEX,
    NON_SEGNO_TIME,
}
