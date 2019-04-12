// tslint:disable no-magic-numbers

import { Amplitude, Index, negative, Scalar, to } from '@musical-patterns/utilities'

const FULL_GAIN: Scalar<Amplitude> = to.Scalar(to.Amplitude(1))
const SILENT: Scalar<Amplitude> = to.Scalar(to.Amplitude(0))

const STANDARD_PITCH_INDEX_INDICATING_REST: Index = to.Index(negative(1))

const STANDARD_DURATIONS_SCALE_INDEX: Index = to.Index(1)
const STANDARD_PITCH_SCALE_INDEX: Index = to.Index(2)

export {
    FULL_GAIN,
    SILENT,
    STANDARD_PITCH_INDEX_INDICATING_REST,
    STANDARD_DURATIONS_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
}
