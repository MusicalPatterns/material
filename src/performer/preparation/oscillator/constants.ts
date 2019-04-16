// tslint:disable no-magic-numbers

import { Amplitude, Scalar, to } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: Scalar<Scalar<Amplitude>> = to.Scalar<Scalar<Amplitude>>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
