import {
    apply,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NEXT,
    NO_DURATION,
    to,
    Translation,
} from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Translation<Ms>) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Translation<Ms>): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const fillGapSounds: Sound[] = []
        let gapFilled: Ms = NO_DURATION
        let soundIndex: Index = INITIAL
        while (gapFilled < gapToBeFilled) {
            const nextSound: Sound = apply.Index(repetendSounds, soundIndex as Index<Sound>)
            const duration: Ms = nextSound.duration
            gapFilled = apply.Translation(gapFilled, to.Translation(duration))
            fillGapSounds.push(nextSound)
            soundIndex = apply.Translation(soundIndex, NEXT)
            if (soundIndex > indexOfFinalElement(repetendSounds)) {
                soundIndex = INITIAL
            }
        }

        return fillGapSounds
    }

export {
    computeFillGapSounds,
}
