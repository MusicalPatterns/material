// tslint:disable no-magic-numbers

import { Amplitude, negative, Ordinal, Scalar, to } from '@musical-patterns/utilities'

const FULL_GAIN: Scalar<Amplitude> = to.Scalar(to.Amplitude(1))
const SILENT: Scalar<Amplitude> = to.Scalar(to.Amplitude(0))

const STANDARD_PITCH_INDEX_INDICATING_REST: Ordinal = to.Ordinal(negative(1))

const STANDARD_DURATIONS_SCALE_INDEX: Ordinal = to.Ordinal(1)
const STANDARD_PITCH_SCALE_INDEX: Ordinal = to.Ordinal(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
