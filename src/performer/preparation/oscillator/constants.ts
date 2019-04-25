// tslint:disable no-magic-numbers

import { Amplitude, as, UnitScalar } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: UnitScalar<Amplitude> =
    as.UnitScalar<Amplitude>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
