import {
    as,
    Duration,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    NO_DURATION,
    ofNotAs,
    Ordinal,
    use,
} from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Duration) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Duration): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const fillGapSounds: Sound[] = []
        let gapFilled: Duration = NO_DURATION
        let soundIndex: Ordinal<Sound[]> = INITIAL
        while (gapFilled < gapToBeFilled) {
            const nextSound: Sound = use.Ordinal(repetendSounds, soundIndex)
            const duration: Duration = nextSound.duration
            gapFilled = use.Translation(gapFilled, as.Translation(ofNotAs(duration)))
            fillGapSounds.push(nextSound)
            soundIndex = use.Cardinal(soundIndex, INCREMENT)
            if (soundIndex > indexOfFinalElement(repetendSounds)) {
                soundIndex = INITIAL
            }
        }

        return fillGapSounds
    }

export {
    computeFillGapSounds,
}
