import { as, Duration, INITIAL, isEmpty, Ms } from '@musical-patterns/utilities'
import { soundIterator } from '../../../helpers'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Duration) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Duration): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const { soundsUpToTime } = soundIterator({
            sounds: repetendSounds,
            upToTime: as.Point<Ms>(as.number(gapToBeFilled)),
            wrapIndex: INITIAL,
        })

        return soundsUpToTime
    }

export {
    computeFillGapSounds,
}
