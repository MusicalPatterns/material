import {
    apply,
    INCREMENT,
    Index,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NO_DURATION,
    ofUnits,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Ms) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Ms): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const fillGapSounds: Sound[] = []
        const initialSoundIndex: Index<Sound> = INITIAL
        let gapFilled: Ms = NO_DURATION
        let soundIndex: Index<Sound> = initialSoundIndex
        while (gapFilled < gapToBeFilled) {
            const nextSound: Sound = apply.Index(repetendSounds, soundIndex)
            const duration: Ms = nextSound.duration
            gapFilled = apply.Translation(gapFilled, to.Translation(ofUnits<'Ms'>(duration)))
            fillGapSounds.push(nextSound)
            soundIndex = apply.Translation(soundIndex, INCREMENT)
            if (soundIndex > indexOfFinalElement(repetendSounds)) {
                soundIndex = initialSoundIndex
            }
        }

        return fillGapSounds
    }

export {
    computeFillGapSounds,
}
