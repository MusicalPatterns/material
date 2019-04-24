import { Duration, NO_DURATION, sum } from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { Scale } from '../../types'
import { compileSoundFeature, CompileSoundsOptions, Note, NoteFeature } from '../sound'

const computeNotesTotalCompiledDuration: (notes: Note[], scales?: Scale[]) => Duration =
    (notes: Note[], scales?: Scale[]): Duration =>
        notes.reduce(
            (totalDuration: Duration, note: Note): Duration => {
                const noteDuration: NoteFeature<Duration> = note.duration || {}
                const options: CompileSoundsOptions<Duration> = { scales: scales as Array<Scale<Duration>> }
                const duration: Duration = compileSoundFeature(noteDuration, options)

                return sum(totalDuration, duration)
            },
            NO_DURATION,
        )

const computeSoundsDuration: (sounds: Sound[]) => Duration =
    (sounds: Sound[]): Duration =>
        sounds.reduce(
            (accumulator: Duration, sound: Sound): Duration =>
                sum(accumulator, sound.duration),
            NO_DURATION,
        )

export {
    computeNotesTotalCompiledDuration,
    computeSoundsDuration,
}
