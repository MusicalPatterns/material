import {
    BEGINNING,
    Duration,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isUndefined,
    Ms,
    Ordinal,
    Point,
    use,
} from '@musical-patterns/utilities'
import { Sound } from '../performer'
import { SoundIteratorParameters, SoundIteratorResult } from './types'

const soundIterator: (parameters: {
    sounds: Sound[],
    upToTime: Point<Ms>,
    wrapIndex?: Ordinal<Sound[]>,
}) => SoundIteratorResult =
    ({ sounds, upToTime, wrapIndex }: SoundIteratorParameters): SoundIteratorResult => {
        let soundIndex: Ordinal<Sound[]> = INITIAL
        let soundTime: Point<Ms> = BEGINNING
        const soundsUpToTime: Sound[] = []

        while (soundTime < upToTime) {
            const nextSound: Sound = use.Ordinal(sounds, soundIndex)
            const duration: Duration = nextSound.duration
            soundTime = use.Translation(soundTime, duration)
            soundIndex = use.Cardinal(soundIndex, INCREMENT)

            soundsUpToTime.push(nextSound)

            if (soundIndex > indexOfFinalElement(sounds)) {
                if (isUndefined(wrapIndex)) {
                    break
                }
                soundIndex = wrapIndex
            }
        }

        return { soundIndex, soundTime, soundsUpToTime }
    }

export {
    soundIterator,
}
