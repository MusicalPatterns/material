import {
    as,
    BEGINNING,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    isUndefined,
    Ms,
    ofNotAs,
    Ordinal,
    use,
} from '@musical-patterns/utilities'
import { NON_SEGNO_INDEX, NON_SEGNO_TIME, Sound, Voice } from '../../../performer'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], timePosition: Ms) => Ordinal<Sound[]> =
    (sounds: Sound[], timePosition: Ms): Ordinal<Sound[]> => {
        let soundIndex: Ordinal<Sound[]> = INITIAL
        let nextStart: Ms = BEGINNING
        while (nextStart < timePosition) {
            const nextSound: Sound = use.Ordinal(sounds, soundIndex)
            const duration: Ms = nextSound.duration
            nextStart = use.Translation(nextStart, as.Translation(ofNotAs(duration)))
            soundIndex = use.Translation(soundIndex, INCREMENT)

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
}) => Ordinal<Sound[]> =
    (
        {
            collectiveSegnoTime,
            individualSegnoTime,
            voice,
        }: ComputeSegnoIndexParameters,
    ): Ordinal<Sound[]> =>
        individualSegnoTime === NON_SEGNO_TIME || isUndefined(voice.sounds) || isEmpty(voice.sounds) ?
            NON_SEGNO_INDEX :
            computeFirstSoundIndexAfterTime(
                voice.sounds,
                collectiveSegnoTime,
            )

export {
    computeSegnoIndex,
}
