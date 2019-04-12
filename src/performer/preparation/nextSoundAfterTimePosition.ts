import {
    apply,
    BEGINNING,
    from,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NEXT,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../types'
import { ComputeNextSoundAfterTimePositionParameters, NextSound } from './types'

const computeNextSoundAfterTimePosition:
    (parameters: { segnoIndex: Index, sounds: Sound[], timePosition: Ms }) => NextSound =
    ({ sounds, timePosition, segnoIndex }: ComputeNextSoundAfterTimePositionParameters): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: INITIAL, nextStart: BEGINNING }
        }

        let soundIndex: Index = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Index(sounds, soundIndex as Index<Sound>)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(to.Index(duration)))
            soundIndex = apply.Translation(soundIndex, NEXT)

            if (soundIndex > indexOfFinalElement(sounds)) {
                soundIndex = segnoIndex
            }
        }

        return { soundIndex, nextStart }
    }

export {
    computeNextSoundAfterTimePosition,
}
