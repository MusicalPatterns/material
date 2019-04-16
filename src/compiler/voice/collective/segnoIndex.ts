import {
    apply,
    BEGINNING,
    INCREMENT,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    isUndefined,
    Ms,
    ofUnits,
    to,
} from '@musical-patterns/utilities'
import { NON_SEGNO_INDEX, NON_SEGNO_TIME, Sound, Voice } from '../../../performer'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], timePosition: Ms) => Index<Sound> =
    (sounds: Sound[], timePosition: Ms): Index<Sound> => {
        let soundIndex: Index<Sound> = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = apply.Index(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = apply.Translation(nextStart, to.Translation(ofUnits<'Ms'>(duration)))
            soundIndex = apply.Translation(soundIndex, INCREMENT)

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
}) => Index<Sound> =
    (
        {
            collectiveSegnoTime,
            individualSegnoTime,
            voice,
        }: ComputeSegnoIndexParameters,
    ): Index<Sound> =>
        individualSegnoTime === NON_SEGNO_TIME || isUndefined(voice.sounds) || isEmpty(voice.sounds) ?
            NON_SEGNO_INDEX :
            computeFirstSoundIndexAfterTime(
                voice.sounds,
                collectiveSegnoTime,
            )

export {
    computeSegnoIndex,
}
