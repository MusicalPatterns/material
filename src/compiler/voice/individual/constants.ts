// tslint:disable no-magic-numbers

import { Index, negative, to } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const TEMPORARY_UNDEFINED_SEGNO_INDEX: Index<Sound> = to.Index<Sound>(negative(2))

export {
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
}
