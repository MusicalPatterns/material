// tslint:disable no-magic-numbers

import { Amplitude, negative, NormalScalar, Ordinal, Scalar, to } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: NormalScalar<Amplitude> = to.NormalScalar<Amplitude>(1)
const SILENT: NormalScalar<Amplitude> = to.NormalScalar<Amplitude>(0)

const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Scalar> = to.Ordinal<Scalar>(negative(1))

const STANDARD_DURATIONS_SCALE_INDEX: Ordinal<Scale> = to.Ordinal<Scale>(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal<Scale> = to.Ordinal<Scale>(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
