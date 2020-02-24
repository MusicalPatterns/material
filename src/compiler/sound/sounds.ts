import {
    ADDITIVE_IDENTITY,
    computeLength,
    Coordinate,
    Duration,
    Gain,
    INITIAL,
    Intensity,
    isArray,
    Location,
    MULTIPLICATIVE_IDENTITY,
    musicalAs,
    Pitch,
    Position,
    THREE_DIMENSIONAL,
    Tone,
    use,
    Value,
} from '@musical-patterns/utilities'
import { Sound } from '../../performer'
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_ENVELOPE } from './constants'
import { compileSoundFeature } from './features'
import { AbstractName, CompileSoundsOptions, Feature, Note, PositionFeature } from './types'

const computeDefaultFeature: <FeatureType extends Number = number>() => Feature<FeatureType> =
    <FeatureType extends Number = number>(): Feature<FeatureType> => ({
        index: INITIAL,
        scalar: MULTIPLICATIVE_IDENTITY,
        scaleIndex: INITIAL,
        translation: ADDITIVE_IDENTITY,
    })

const compileLocation: (position?: PositionFeature, options?: CompileSoundsOptions) => Coordinate<Location> =
    (position?: PositionFeature, options?: CompileSoundsOptions): Coordinate<Location> => {
        const location: Coordinate<Location> = position ?
            isArray(position) ?
                position.map(
                    (positionElement: Feature<Position>): Location =>
                        compileSoundFeature(positionElement, AbstractName.POSITION, options as CompileSoundsOptions))
                :
                [ compileSoundFeature(position, AbstractName.POSITION, options as CompileSoundsOptions) ]
            :
            []
        while (computeLength(location) < THREE_DIMENSIONAL) {
            location.push(musicalAs.Location(0))
        }

        return location
    }

const compileSustain: (note: Note, duration: Duration, options?: CompileSoundsOptions) => Duration =
    (note: Note, duration: Duration, options?: CompileSoundsOptions): Duration => {
        const envelope: Feature<Value> = note.envelope || note.value || computeDefaultFeature()
        const sustain: Duration = compileSoundFeature(envelope, AbstractName.VALUE, options as CompileSoundsOptions)

        return sustain < duration ?
            sustain :
            use.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_ENVELOPE)
    }

const compileSound: (note: Note, options?: CompileSoundsOptions) => Sound =
    (note: Note, options?: CompileSoundsOptions): Sound => {
        const {
            value = computeDefaultFeature<Value>(),
            intensity = computeDefaultFeature<Intensity>(),
            pitch = computeDefaultFeature<Pitch>(),
        } = note

        const duration: Duration = compileSoundFeature(value, AbstractName.VALUE, options as CompileSoundsOptions)
        const gain: Gain = compileSoundFeature(intensity, AbstractName.INTENSITY, options as CompileSoundsOptions)
        const tone: Tone = compileSoundFeature(pitch, AbstractName.PITCH, options as CompileSoundsOptions)

        const location: Coordinate<Location> = compileLocation(note.position, options)
        const sustain: Duration = compileSustain(note, duration, options)

        return { duration, gain, tone, location, sustain }
    }

const compileSounds: (notes: Note[], options: CompileSoundsOptions) => Sound[] =
    (notes: Note[], options: CompileSoundsOptions): Sound[] =>
        notes.map((note: Note): Sound =>
            compileSound(note, options))

export {
    compileSound,
    compileSounds,
}
