// tslint:disable no-magic-numbers

import { Index, Ms, negative, to } from '@musical-patterns/utilities'

const NON_SEGNO_INDEX: Index = to.Index(negative(1))
const NON_SEGNO_TIME: Ms = to.Ms(negative(1))

export {
    NON_SEGNO_INDEX,
    NON_SEGNO_TIME,
}
