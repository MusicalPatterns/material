import { Maybe, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'
import { SoundFeature } from '../nominals'
import { Adjustable, Scale } from '../types'

interface NoteFeature extends Adjustable {
    index?: Ordinal,
    scaleIndex?: Ordinal,
}

interface ComputeScalePropertiesParameters {
    index: Ordinal,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal,
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
