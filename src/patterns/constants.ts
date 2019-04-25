// tslint:disable no-magic-numbers

import { as, Duration, Gain, negative, Ordinal, Pitch, Scalar } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: Scalar<Gain> = as.Scalar<Gain>(1)
const SILENT: Scalar<Gain> = as.Scalar<Gain>(0)

// tslint:disable-next-line no-any
const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Array<Scalar<any>>> = as.Ordinal<Array<Scalar<any>>>(negative(1))

const STANDARD_DURATION_SCALE_INDEX: Ordinal<Array<Scale<Duration>>> = as.Ordinal<Array<Scale<Duration>>>(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal<Array<Scale<Pitch>>> = as.Ordinal<Array<Scale<Pitch>>>(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATION_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
