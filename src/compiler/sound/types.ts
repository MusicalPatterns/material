import { Index, Maybe, Scalar, Translation } from '@musical-patterns/utilities'
import { Adjustable, Scale } from '../../types'
import { SoundFeature } from '../nominals'

interface NoteFeature extends Adjustable {
    index?: Index,
    scaleIndex?: Index,
}

interface ComputeScalePropertiesParameters {
    index: Index,
    options?: CompileSoundsOptions,
    scaleIndex: Index,
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
