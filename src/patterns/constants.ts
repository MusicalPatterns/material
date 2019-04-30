// tslint:disable no-magic-numbers

import { Amplitude, as, Duration, Integer, negative, Ordinal, Pitch, Scalar, use } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: Scalar<Amplitude> = as.Scalar<Amplitude>(1)
const SILENT: Scalar<Amplitude> = as.Scalar<Amplitude>(0)

// tslint:disable-next-line no-any
const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Array<Scalar<any>>> = as.Ordinal<Array<Scalar<any>>>(negative(1))

const STANDARD_DURATION_SCALE_INDEX: Ordinal<Array<Scale<Duration>>> = as.Ordinal<Array<Scale<Duration>>>(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal<Array<Scale<Pitch>>> = as.Ordinal<Array<Scale<Pitch>>>(2)

const ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD: Integer =
    as.Integer(use.Power(2, as.Power(10)))

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATION_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
    ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD,
}
