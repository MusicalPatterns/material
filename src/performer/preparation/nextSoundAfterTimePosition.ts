import {
    BEGINNING,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    Ordinal,
    Point,
    Translation,
    use,
} from '@musical-patterns/utilities'
import { Sound } from '../types'
import { ComputeNextSoundAfterTimePositionParameters, NextSound } from './types'

const computeNextSoundAfterTimePosition:
    (parameters: { segnoIndex: Ordinal<Sound[]>, sounds: Sound[], timePosition: Point<Ms> }) => NextSound =
    ({ sounds, timePosition, segnoIndex }: ComputeNextSoundAfterTimePositionParameters): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: INITIAL, nextStart: BEGINNING }
        }

        let soundIndex: Ordinal<Sound[]> = INITIAL
        let nextStart: Point<Ms> = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = use.Ordinal(sounds, soundIndex)
            const duration: Translation<Ms> = nextSound.duration
            nextStart = use.Translation(nextStart, duration)
            soundIndex = use.Cardinal(soundIndex, INCREMENT)

            if (soundIndex > indexOfFinalElement(sounds)) {
                soundIndex = segnoIndex
            }
        }

        return { soundIndex, nextStart }
    }

export {
    computeNextSoundAfterTimePosition,
}
