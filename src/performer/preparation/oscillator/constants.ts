// tslint:disable no-magic-numbers

import { as, Gain, NormalScalar } from '@musical-patterns/utilities'

const GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS: NormalScalar<Gain> =
    as.NormalScalar<Gain>(0.1)

export {
    GAIN_SCALAR_FOR_WEB_AUDIO_OSCILLATORS,
}
