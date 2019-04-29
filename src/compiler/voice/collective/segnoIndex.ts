import { isEmpty, isUndefined, Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { soundIterator } from '../../../helpers'
import { NON_SEGNO_INDEX, NON_SEGNO_TIME, Sound, Voice } from '../../../performer'
import { ComputeSegnoIndexParameters } from './types'

const computeFirstSoundIndexAfterTime: (sounds: Sound[], time: Point<Ms>) => Ordinal<Sound[]> =
    (sounds: Sound[], time: Point<Ms>): Ordinal<Sound[]> =>
        soundIterator({ sounds, upToTime: time }).soundIndex

const computeSegnoIndex: (parameters: {
    collectiveSegnoTime: Point<Ms>
    individualSegnoTime: Point<Ms>,
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
