import { Ms, NO_DURATION, sum, Translation } from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { Scale } from '../../types'
import { compileSoundFeature, Note, NoteFeature } from '../sound'

const computeNotesTotalCompiledDuration: (notes: Note[], scales?: Scale[]) => Translation<Ms> =
    (notes: Note[], scales?: Scale[]): Translation<Ms> =>
        notes.reduce(
            (totalDuration: Translation<Ms>, note: Note): Translation<Ms> => {
                const noteDuration: NoteFeature = note.duration || {}
                const duration: Translation<Ms> = compileSoundFeature(noteDuration, { scales })

                return sum(totalDuration, duration)
            },
            NO_DURATION,
        )

const computeSoundsDuration: (sounds: Sound[]) => Translation<Ms> =
    (sounds: Sound[]): Translation<Ms> =>
        sounds.reduce(
            (accumulator: Translation<Ms>, sound: Sound): Translation<Ms> =>
                sum(accumulator, sound.duration),
            NO_DURATION,
        )

export {
    computeNotesTotalCompiledDuration,
    computeSoundsDuration,
}
