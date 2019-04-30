import {
    ADDITIVE_IDENTITY,
    as,
    Coordinate,
    Duration,
    Gain,
    INITIAL,
    Intensity,
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
import { DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN } from './constants'
import { compileSoundFeature } from './features'
import { CompileSoundsOptions, Feature, Note, PositionFeature } from './types'

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
            position instanceof Array ?
                position.map(
                    (positionElement: Feature<Position>) =>
                        compileSoundFeature(positionElement, options as CompileSoundsOptions<Position>))
                :
                [ compileSoundFeature(position, options as CompileSoundsOptions<Position>) ]
            :
            []
        while (location.length < as.number(THREE_DIMENSIONAL)) {
            location.push(musicalAs.Location(0))
        }

        return location
    }

const compileSustain: (note: Note, duration: Duration, options?: CompileSoundsOptions) => Duration =
    (note: Note, duration: Duration, options?: CompileSoundsOptions): Duration => {
        const envelope: Feature<Value> = note.envelope || note.value || computeDefaultFeature()
        const sustain: Duration = compileSoundFeature(envelope, options as CompileSoundsOptions<Value>)

        return sustain < duration ?
            sustain :
            use.Translation(duration, DEFAULT_TRANSLATION_FOR_ALMOST_FULL_SUSTAIN)
    }

const compileSound: (note: Note, options?: CompileSoundsOptions) => Sound =
    (note: Note, options?: CompileSoundsOptions): Sound => {
        const {
            value = computeDefaultFeature<Value>(),
            intensity = computeDefaultFeature<Intensity>(),
            pitch = computeDefaultFeature<Pitch>(),
        } = note

        const duration: Duration = compileSoundFeature(value, options as CompileSoundsOptions<Value>)
        const gain: Gain = compileSoundFeature(intensity, options as CompileSoundsOptions<Intensity>)
        const tone: Tone = compileSoundFeature(pitch, options as CompileSoundsOptions<Pitch>)

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
