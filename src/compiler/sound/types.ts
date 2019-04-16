import { Index, Maybe, Scalar, Translation } from '@musical-patterns/utilities'
import { Adjustable, Scale } from '../../types'
import { SoundFeature } from '../nominals'

interface NoteFeature extends Adjustable<Scalar> {
    index?: Index<Scalar>,
    scaleIndex?: Index<Scale>,
}

interface ComputeScalePropertiesParameters {
    index: Index<Scalar>,
    options?: CompileSoundsOptions,
    scaleIndex: Index<Scale>,
}

interface ScaleProperties {
    scaleElement: Maybe<SoundFeature>,
    scaleScalar: Scalar,
    scaleTranslation: Translation,
}

interface Note {
    duration?: NoteFeature,
    gain?: NoteFeature,
    pitch?: NoteFeature,
    position?: NoteFeature | NoteFeature[],
    sustain?: NoteFeature,
}

interface CompileSoundsOptions {
    scales?: Scale[],
}

export {
    Note,
    NoteFeature,
    ScaleProperties,
    ComputeScalePropertiesParameters,
    CompileSoundsOptions,
}
