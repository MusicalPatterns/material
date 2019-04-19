// tslint:disable no-magic-numbers

import { Amplitude, NormalScalar, to } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: NormalScalar<NormalScalar<Amplitude>> =
    to.NormalScalar<NormalScalar<Amplitude>>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
