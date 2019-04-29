import { BEGINNING, INITIAL, isEmpty, Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { soundIterator } from '../../helpers'
import { Sound } from '../types'
import { ComputeNextSoundAfterTimeParameters, NextSound } from './types'

const computeNextSoundAfterTime:
    (parameters: { segnoIndex: Ordinal<Sound[]>, sounds: Sound[], time: Point<Ms> }) => NextSound =
    ({ sounds, time, segnoIndex }: ComputeNextSoundAfterTimeParameters): NextSound => {
        if (isEmpty(sounds)) {
            return { soundIndex: INITIAL, nextStart: BEGINNING }
        }

        const { soundIndex, soundTime } = soundIterator({
            sounds,
            upToTime: time,
            wrapIndex: segnoIndex,
        })

        return { soundIndex, nextStart: soundTime }

    }

export {
    computeNextSoundAfterTime,
}
