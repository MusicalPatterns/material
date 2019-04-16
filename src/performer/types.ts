import { Index, Ms } from '@musical-patterns/utilities'
import { SoundToPlay, StartSound, StopSound } from './performance'
import { SourceRequest } from './preparation'

interface PreparedVoice {
    delay: Ms,
    nextStart: Ms,
    nextStop: Ms,
    segnoIndex: Index<Sound>,
    soundIndex: Index<Sound>,
    sounds: Sound[],
    source: Source,
}

interface Voice {
    delay: Ms,
    segnoIndex: Index<Sound>,
    sounds: Sound[],
    sourceRequest: SourceRequest,
}

interface Sound extends SoundToPlay {
    duration: Ms,
    sustain: Ms,
}

interface Source {
    startSound: StartSound,
    stopSound: StopSound,
}

export {
    PreparedVoice,
    Voice,
    Sound,
    Source,
}
