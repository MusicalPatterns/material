import {
    ADDITIVE_IDENTITY,
    apply,
    Coordinate,
    from,
    Hz,
    INITIAL,
    Meters,
    Ms,
    MULTIPLICATIVE_IDENTITY,
    Scalar,
    THREE_DIMENSIONAL,
    to,
} from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN } from './constants'
import { compileSoundFeature } from './features'
import { CompileSoundsOptions, Note, NoteFeature } from './types'

const defaultNoteFeature: NoteFeature = {
    index: INITIAL,
    scalar: MULTIPLICATIVE_IDENTITY,
    scaleIndex: INITIAL,
    translation: ADDITIVE_IDENTITY,
}

const compilePosition:
    (notePosition?: NoteFeature | NoteFeature[], options?: CompileSoundsOptions) => Coordinate<Meters> =
    (notePosition?: NoteFeature | NoteFeature[], options?: CompileSoundsOptions): Coordinate<Meters> => {
        const position: Coordinate<Meters> = notePosition ?
            notePosition instanceof Array ?
                notePosition.map(
                    (positionElement: NoteFeature): Meters =>
                        compileSoundFeature(positionElement, options))
                :
                [ compileSoundFeature(notePosition, options) ]
            :
            []
        while (position.length < from.Cardinal(THREE_DIMENSIONAL)) {
            position.push(to.Meters(0))
        }

        return position
    }

const compileSustain: (note: Note, duration: Ms, options?: CompileSoundsOptions) => Ms =
    (note: Note, duration: Ms, options?: CompileSoundsOptions): Ms => {
        const noteSustain: NoteFeature = note.sustain || note.duration || defaultNoteFeature
        const sustain: Ms = compileSoundFeature(noteSustain, options)

        return sustain < duration ?
            sustain :
            apply.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN)
    }

const compileSound: (note: Note, options?: CompileSoundsOptions) => Sound =
    (note: Note, options?: CompileSoundsOptions): Sound => {
        const {
            duration: noteDuration = defaultNoteFeature,
            gain: noteGain = defaultNoteFeature,
            pitch: notePitch = defaultNoteFeature,
        } = note

        const duration: Ms = compileSoundFeature(noteDuration, options)
        const gain: Scalar = compileSoundFeature(noteGain, options)
        const frequency: Hz = compileSoundFeature(notePitch, options)

        const position: Coordinate<Meters> = compilePosition(note.position, options)
        const sustain: Ms = compileSustain(note, duration, options)

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
