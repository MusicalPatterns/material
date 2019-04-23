import { Ms, Ordinal, Point, Translation } from '@musical-patterns/utilities'
import { SoundToPlay, StartSound, StopSound } from './performance'
import { SourceRequest } from './preparation'

interface PreparedVoice {
    delay: Translation<Ms>,
    nextStart: Point<Ms>,
    nextStop: Point<Ms>,
    segnoIndex: Ordinal<Sound[]>,
    soundIndex: Ordinal<Sound[]>,
    sounds: Sound[],
    source: Source,
}

interface Voice {
    delay: Translation<Ms>,
    segnoIndex: Ordinal<Sound[]>,
    sounds: Sound[],
    sourceRequest: SourceRequest,
}

interface Sound extends SoundToPlay {
    duration: Translation<Ms>,
    sustain: Translation<Ms>,
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
