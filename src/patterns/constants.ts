// tslint:disable no-magic-numbers

import { as, Integer, Intensity, negative, Ordinal, Pitch, Scalar, use, Value } from '@musical-patterns/utilities'
import { Scale } from '../types'

const FULL_GAIN: Scalar<Intensity> = as.Scalar<Intensity>(1)
const SILENT: Scalar<Intensity> = as.Scalar<Intensity>(0)

// tslint:disable-next-line no-any
const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Array<Scalar<any>>> = as.Ordinal<Array<Scalar<any>>>(negative(1))

const STANDARD_VALUE_SCALE_INDEX: Ordinal<Array<Scale<Value>>> = as.Ordinal<Array<Scale<Value>>>(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal<Array<Scale<Pitch>>> = as.Ordinal<Array<Scale<Pitch>>>(2)

const ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD: Integer =
    as.Integer(use.Power(2, as.Power(10)))

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_VALUE_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
    ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD,
}
