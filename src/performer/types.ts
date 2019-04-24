import { Duration, Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { SoundToPlay, StartSound, StopSound } from './performance'
import { SourceRequest } from './preparation'

interface PreparedVoice {
    delay: Duration,
    nextStart: Point<Ms>,
    nextStop: Point<Ms>,
    segnoIndex: Ordinal<Sound[]>,
    soundIndex: Ordinal<Sound[]>,
    sounds: Sound[],
    source: Source,
}

interface Voice {
    delay: Duration,
    segnoIndex: Ordinal<Sound[]>,
    sounds: Sound[],
    sourceRequest: SourceRequest,
}

interface Sound extends SoundToPlay {
    duration: Duration,
    sustain: Duration,
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
