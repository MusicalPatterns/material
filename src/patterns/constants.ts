// tslint:disable no-magic-numbers

import { as, Integer, Intensity, negative, Ordinal, Scalar, use } from '@musical-patterns/utilities'

const FULL_GAIN: Scalar<Intensity> = as.Scalar<Intensity>(1)
const SILENT: Scalar<Intensity> = as.Scalar<Intensity>(0)

// tslint:disable-next-line no-any
const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal<Array<Scalar<any>>> = as.Ordinal<Array<Scalar<any>>>(negative(1))

const ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD: Integer =
    as.Integer(use.Power(2, as.Power(10)))

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD,
}
