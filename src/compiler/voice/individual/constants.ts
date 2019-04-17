// tslint:disable no-magic-numbers

import { negative, Ordinal, to } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const TEMPORARY_UNDEFINED_SEGNO_INDEX: Ordinal<Sound> = to.Ordinal<Sound>(negative(2))

export {
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
}
