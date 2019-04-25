// tslint:disable no-magic-numbers

import { as, Gain, UnitScalar } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: UnitScalar<Gain> =
    as.UnitScalar<Gain>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
