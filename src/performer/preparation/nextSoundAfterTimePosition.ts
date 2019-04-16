import {
    apply,
    BEGINNING,
    INCREMENT,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    ofUnits,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../types'
import { ComputeNextSoundAfterTimePositionParameters, NextSound } from './types'

const computeNextSoundAfterTimePosition:
    (parameters: { segnoIndex: Index<Sound>, sounds: Sound[], timePosition: Ms }) => NextSound =
    ({ sounds, timePosition, segnoIndex }: ComputeNextSoundAfterTimePositionParameters): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: INITIAL, nextStart: BEGINNING }
        }

        let soundIndex: Index<Sound> = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Index(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(ofUnits<'Ms'>(duration)))
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
