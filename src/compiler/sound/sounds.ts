import {
    ADDITIVE_IDENTITY,
    as,
    Coordinate,
    Duration,
    Gain,
    INITIAL,
    Meters,
    MULTIPLICATIVE_IDENTITY,
    
    Pitch,
    Position,
    THREE_DIMENSIONAL,
    use,
} from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN } from './constants'
import { compileSoundFeature } from './features'
import { CompileSoundsOptions, Note, NoteFeature, PositionFeature } from './types'

const computeDefaultNoteFeature: <FeatureType extends Number = number>() => NoteFeature<FeatureType> =
    <FeatureType extends Number = number>(): NoteFeature<FeatureType> => ({
        index: INITIAL,
        scalar: MULTIPLICATIVE_IDENTITY,
        scaleIndex: INITIAL,
        translation: ADDITIVE_IDENTITY,
    })

const compilePosition: (notePosition?: PositionFeature, options?: CompileSoundsOptions) => Coordinate<Position> =
    (notePosition?: PositionFeature, options?: CompileSoundsOptions): Coordinate<Position> => {
        const position: Coordinate<Position> = notePosition ?
            notePosition instanceof Array ?
                notePosition.map(
                    (positionElement: NoteFeature<Position>): Position =>
                        compileSoundFeature(positionElement, options as CompileSoundsOptions<Position>))
                :
                [ compileSoundFeature(notePosition, options as CompileSoundsOptions<Position>) ]
            :
            []
        while (position.length < as.number(THREE_DIMENSIONAL)) {
            position.push(as.Point<Meters>(0))
        }

        return position
    }

const compileSustain: (note: Note, duration: Duration, options?: CompileSoundsOptions) => Duration =
    (note: Note, duration: Duration, options?: CompileSoundsOptions): Duration => {
        const noteSustain: NoteFeature<Duration> = note.sustain || note.duration || computeDefaultNoteFeature()
        const sustain: Duration = compileSoundFeature(noteSustain, options as CompileSoundsOptions<Duration>)

        return sustain < duration ?
            sustain :
            use.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN)
    }

const compileSound: (note: Note, options?: CompileSoundsOptions) => Sound =
    (note: Note, options?: CompileSoundsOptions): Sound => {
        const {
            duration: noteDuration = computeDefaultNoteFeature<Duration>(),
            gain: noteGain = computeDefaultNoteFeature<Gain>(),
            pitch: notePitch = computeDefaultNoteFeature<Pitch>(),
        } = note

        const duration: Duration = compileSoundFeature(noteDuration, options as CompileSoundsOptions<Duration>)
        const gain: Gain = compileSoundFeature(noteGain, options as CompileSoundsOptions<Gain>)
        const frequency: Pitch = compileSoundFeature(notePitch, options as CompileSoundsOptions<Pitch>)

        const position: Coordinate<Position> = compilePosition(note.position, options)
        const sustain: Duration = compileSustain(note, duration, options)

        return { duration, gain, frequency, position, sustain }
    }

const compileSounds: (notes: Note[], options: CompileSoundsOptions) => Sound[] =
    (notes: Note[], options: CompileSoundsOptions): Sound[] =>
        notes.map((note: Note): Sound =>
            compileSound(note, options))

export {
    compileSound,
    compileSounds,
}
