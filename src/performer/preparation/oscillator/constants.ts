// tslint:disable no-magic-numbers

import { Amplitude, as, NormalScalar } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: NormalScalar<NormalScalar<Amplitude>> =
    as.NormalScalar<NormalScalar<Amplitude>>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
