import { Duration, musicalAs, sum, Value } from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { Scale } from '../../types'
import { compileSoundFeature, CompileSoundsOptions, Feature, Note } from '../sound'

const computeNotesDuration: (notes: Note[], scales?: Scale[]) => Duration =
    (notes: Note[], scales?: Scale[]): Duration =>
        notes.reduce(
            (totalDuration: Duration, note: Note) => {
                const value: Feature<Value> = note.value || {}
                const options: CompileSoundsOptions<Value> = { scales: scales as Array<Scale<Value>> }
                const duration: Duration = compileSoundFeature(value, options)

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
