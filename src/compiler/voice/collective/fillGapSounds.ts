import {
    apply,
    from,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NEXT,
    NO_DURATION,
    Ordinal,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Ms) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Ms): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const fillGapSounds: Sound[] = []
        let gapFilled: Ms = NO_DURATION
        let soundIndex: Ordinal = INITIAL
        while (gapFilled < gapToBeFilled) {
            const nextSound: Sound = apply.Ordinal(repetendSounds, soundIndex)
            const duration: Ms = nextSound.duration
            gapFilled = apply.Translation(gapFilled, to.Translation(duration))
            fillGapSounds.push(nextSound)
            soundIndex = apply.Translation(soundIndex, NEXT)
            if (from.Ordinal(soundIndex) > indexOfFinalElement(repetendSounds)) {
                soundIndex = INITIAL
            }
        }

        return fillGapSounds
    }

export {
    computeFillGapSounds,
}
