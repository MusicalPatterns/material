// tslint:disable no-magic-numbers

import { Amplitude, Index, negative, Scalar, to } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: Scalar<Amplitude> = to.Scalar<Amplitude>(1)
const SILENT: Scalar<Amplitude> = to.Scalar<Amplitude>(0)

const STANDARD_PITCH_INDEX_INDICATING_REST: Index<Scalar> = to.Index<Scalar>(negative(1))

const STANDARD_DURATIONS_SCALE_INDEX: Index<Scale> = to.Index<Scale>(1)
const STANDARD_PITCH_SCALE_INDEX: Index<Scale> = to.Index<Scale>(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
