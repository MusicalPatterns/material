// tslint:disable no-magic-numbers

import { Amplitude, NormalScalar, Scalar, to } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: Scalar<NormalScalar<Amplitude>> = to.Scalar<NormalScalar<Amplitude>>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
