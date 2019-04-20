// tslint:disable no-magic-numbers

import { as, negative, Ordinal } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const TEMPORARY_UNDEFINED_SEGNO_INDEX: Ordinal<Sound> = as.Ordinal<Sound>(negative(2))

export {
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
}
