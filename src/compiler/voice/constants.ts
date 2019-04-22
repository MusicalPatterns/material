// tslint:disable no-magic-numbers

import { as, Ordinal } from '@musical-patterns/utilities'
import { Section } from './types'

const NOT_FOUND: Ordinal<Section[]> = as.Ordinal<Section[]>(-1)

export {
    NOT_FOUND,
}
