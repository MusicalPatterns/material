// tslint:disable no-magic-numbers

import { Ordinal, to } from '@musical-patterns/utilities'
import { Section } from './types'

const NOT_FOUND: Ordinal<Section> = to.Ordinal<Section>(-1)

export {
    NOT_FOUND,
}
