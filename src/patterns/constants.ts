// tslint:disable no-magic-numbers

import { Amplitude, as, negative, NormalScalar, Ordinal, Scalar } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: NormalScalar<Amplitude> = as.NormalScalar<Amplitude>(1)
const SILENT: NormalScalar<Amplitude> = as.NormalScalar<Amplitude>(0)

const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Scalar[]> = as.Ordinal<Scalar[]>(negative(1))

const STANDARD_DURATIONS_SCALE_INDEX: Ordinal<Scale[]> = as.Ordinal<Scale[]>(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal<Scale[]> = as.Ordinal<Scale[]>(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
