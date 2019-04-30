import { use } from '@musical-patterns/utilities'
import { Sound } from '../../types'
import { GAIN_NORMAL_SCALAR_FOR_WEB_AUDIO_OSCILLATORS } from './constants'

const applyGainNormalScalarForWebAudioOscillators: (sound: Sound) => Sound =
    (sound: Sound): Sound =>
        ({ ...sound, gain: use.NormalScalar(sound.gain, GAIN_NORMAL_SCALAR_FOR_WEB_AUDIO_OSCILLATORS) })

export {
    applyGainNormalScalarForWebAudioOscillators,
}
