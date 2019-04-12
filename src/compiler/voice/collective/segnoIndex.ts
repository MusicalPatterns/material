import {
    apply,
    BEGINNING,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    isUndefined,
    Ms,
    NEXT,
    to,
} from '@musical-patterns/utilities'
import { NON_SEGNO_INDEX, NON_SEGNO_TIME, Sound, Voice } from '../../../performer'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], timePosition: Ms) => Index =
    (sounds: Sound[], timePosition: Ms): Index => {
        let soundIndex: Index = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Index(sounds, soundIndex as Index<Sound>)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(to.Index(duration)))
            soundIndex = apply.Translation(soundIndex, NEXT)

            if (soundIndex > indexOfFinalElement(sounds)) {
                break
            }
        }

        return soundIndex
    }

const computeSegnoIndex: (parameters: {
    collectiveSegnoTime: Ms
    individualSegnoTime: Ms,
    voice: Voice,
}) => Index =
    (
        {
            collectiveSegnoTime,
            individualSegnoTime,
            voice,
        }: ComputeSegnoIndexParameters,
    ): Index =>
        individualSegnoTime === NON_SEGNO_TIME || isUndefined(voice.sounds) || isEmpty(voice.sounds) ?
            NON_SEGNO_INDEX :
            computeFirstSoundIndexAfterTime(
                voice.sounds,
                collectiveSegnoTime,
            )

export {
    computeSegnoIndex,
}
