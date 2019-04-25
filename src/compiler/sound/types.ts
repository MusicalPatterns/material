import { Amplitude, Duration, Maybe, Ordinal, Pitch, Position, Scalar, Translation } from '@musical-patterns/utilities'
import { Scale } from '../../types'

interface NoteFeature<FeatureType extends Number = number> {
    index?: Ordinal<Array<Scalar<FeatureType>>>,
    scalar?: Scalar<FeatureType>,
    scaleIndex?: Ordinal<Array<Scale<FeatureType>>>,
    translation?: Translation<FeatureType>,
}

interface ComputeScalePropertiesParameters<FeatureType extends Number = number> {
    index: Ordinal<Array<Scalar<FeatureType>>>,
    options?: CompileSoundsOptions<FeatureType>,
    scaleIndex: Ordinal<Array<Scale<FeatureType>>>,
}

interface ScaleProperties<FeatureType extends Number = number> {
    scaleBasis: FeatureType,
    scaleScalar: Maybe<Scalar<FeatureType>>,
    scaleTranslation: Translation<FeatureType>,
}

interface Note {
    duration?: NoteFeature<Duration>,
    gain?: NoteFeature<Amplitude>,
    pitch?: NoteFeature<Pitch>,
    position?: NoteFeature<Position> | Array<NoteFeature<Position>>,
    sustain?: NoteFeature<Duration>,
}

interface CompileSoundsOptions<FeatureType extends Number = number> {
    scales?: Array<Scale<FeatureType>>,
}

export {
    Note,
    NoteFeature,
    ScaleProperties,
    ComputeScalePropertiesParameters,
    CompileSoundsOptions,
}
