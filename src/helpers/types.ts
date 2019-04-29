import { Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { Sound } from '../performer'

interface SoundIteratorResult {
    soundIndex: Ordinal<Sound[]>,
    soundsUpToTime: Sound[],
    soundTime: Point<Ms>,
}

interface SoundIteratorParameters {
    sounds: Sound[],
    upToTime: Point<Ms>,
    wrapIndex?: Ordinal<Sound[]>,
}

export {
    SoundIteratorParameters,
    SoundIteratorResult,
}
