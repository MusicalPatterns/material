import { Maybe, Ordinal, Scalar, Translation } from '@musical-patterns/utilities'
import { Adjustable, Scale } from '../../types'
import { SoundFeature } from '../nominals'

interface NoteFeature extends Adjustable<Scalar> {
    index?: Ordinal<Scalar[]>,
    scaleIndex?: Ordinal<Scale[]>,
}

interface ComputeScalePropertiesParameters {
    index: Ordinal<Scalar[]>,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal<Scale[]>,
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
