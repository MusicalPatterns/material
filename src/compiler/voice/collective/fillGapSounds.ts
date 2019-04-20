import {
    as,
    INCREMENT,
    indexOfFinalElement,
    INITIAL,
    isEmpty,
    Ms,
    NO_DURATION,
    ofNotAs,
    Ordinal,
    use,
} from '@musical-patterns/utilities'
import { Sound } from '../../../performer'

const computeFillGapSounds: (repetendSounds: Sound[], gapToBeFilled: Ms) => Sound[] =
    (repetendSounds: Sound[], gapToBeFilled: Ms): Sound[] => {
        if (isEmpty(repetendSounds)) {
            throw new Error('You will never fill a gap from a source of no sounds')
        }

        const fillGapSounds: Sound[] = []
        const initialSoundIndex: Ordinal<Sound> = INITIAL
        let gapFilled: Ms = NO_DURATION
        let soundIndex: Ordinal<Sound> = initialSoundIndex
        while (gapFilled < gapToBeFilled) {
            const nextSound: Sound = use.Ordinal(repetendSounds, soundIndex)
            const duration: Ms = nextSound.duration
            gapFilled = use.Translation(gapFilled, as.Translation(ofNotAs(duration)))
            fillGapSounds.push(nextSound)
            soundIndex = use.Translation(soundIndex, INCREMENT)
            if (soundIndex > indexOfFinalElement(repetendSounds)) {
                soundIndex = initialSoundIndex
            }
        }

        return fillGapSounds
    }

export {
    computeFillGapSounds,
}
