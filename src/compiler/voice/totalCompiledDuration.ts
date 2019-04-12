import { Ms, NO_DURATION, sum, to } from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { Scale } from '../../types'
import { compileSoundFeature, Note, NoteFeature } from '../sound'

const computeNotesTotalCompiledDuration: (notes: Note[], scales?: Scale[]) => Ms =
    (notes: Note[], scales?: Scale[]): Ms =>
        notes.reduce(
            (totalDuration: Ms, note: Note): Ms => {
                const noteDuration: NoteFeature = note.duration || {}
                const duration: Ms = compileSoundFeature(noteDuration, { scales })

                return to.Ms(sum(totalDuration, duration))
            },
            NO_DURATION,
        )

const computeSoundsDuration: (sounds: Sound[]) => Ms =
    (sounds: Sound[]): Ms =>
        sounds.reduce(
            (accumulator: Ms, sound: Sound): Ms =>
                to.Ms(sum(accumulator, sound.duration)),
            NO_DURATION,
        )

export {
    computeNotesTotalCompiledDuration,
    computeSoundsDuration,
}
