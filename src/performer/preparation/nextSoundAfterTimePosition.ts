import {
    apply,
    BEGINNING,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    ofFrom,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../types'
import { ComputeNextSoundAfterTimePositionParameters, NextSound } from './types'

const computeNextSoundAfterTimePosition:
    (parameters: { segnoIndex: Ordinal<Sound>, sounds: Sound[], timePosition: Ms }) => NextSound =
    ({ sounds, timePosition, segnoIndex }: ComputeNextSoundAfterTimePositionParameters): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: INITIAL, nextStart: BEGINNING }
        }

        let soundIndex: Ordinal<Sound> = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Ordinal(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(ofFrom(duration)))
            soundIndex = apply.Translation(soundIndex, INCREMENT)

            if (soundIndex > indexOfFinalElement(sounds)) {
                soundIndex = segnoIndex
            }
        }

        return { soundIndex, nextStart }
    }

export {
    computeNextSoundAfterTimePosition,
}
