import { Duration, musicalAs, sum, Value } from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { Scales } from '../../types'
import { AbstractName, compileSoundFeature, CompileSoundsOptions, Feature, Note } from '../sound'

const computeNotesDuration: (notes: Note[], scales?: Scales) => Duration =
    (notes: Note[], scales?: Scales): Duration =>
        notes.reduce(
            (totalDuration: Duration, note: Note) => {
                const value: Feature<Value> = note.value || {}
                const options: CompileSoundsOptions = { scales }
                const duration: Duration = compileSoundFeature(value, AbstractName.VALUE, options)

                return sum(totalDuration, duration)
            },
            musicalAs.Duration(0),
        )

const computeSoundsDuration: (sounds: Sound[]) => Duration =
    (sounds: Sound[]): Duration =>
        sounds.reduce(
            (accumulator: Duration, sound: Sound) =>
                sum(accumulator, sound.duration),
            musicalAs.Duration(0),
        )

export {
    computeNotesDuration,
    computeSoundsDuration,
}
