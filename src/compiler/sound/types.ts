import { Intensity, Maybe, Ordinal, Pitch, Position, Scalar, Translation, Value } from '@musical-patterns/utilities'
import { AbstractToPhysical, Scale, Scales } from '../../types'

interface Feature<FeatureType extends Number = number> {
    index?: Ordinal<Array<Scalar<FeatureType>>>,
    scalar?: Scalar<FeatureType>,
    scaleIndex?: Ordinal<Array<Scale<FeatureType>>>,
    translation?: Translation<FeatureType>,
}

interface ComputeScalePropertiesParameters<FeatureType extends Number = number> {
    abstractName: AbstractName,
    index: Ordinal<Array<Scalar<FeatureType>>>,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal<Array<Scale<FeatureType>>>,
}

interface ScaleProperties<FeatureType extends Number = number> {
    scaleBasis: AbstractToPhysical<FeatureType>,
    scaleScalar: Maybe<Scalar<FeatureType>>,
    scaleTranslation: Translation<FeatureType>,
}

type PositionFeature = Feature<Position> | Array<Feature<Position>>

interface Note {
    envelope?: Feature<Value>,
    intensity?: Feature<Intensity>,
    pitch?: Feature<Pitch>,
    position?: PositionFeature,
    value?: Feature<Value>,
}

interface CompileSoundsOptions {
    scales?: Scales,
}

enum AbstractName {
    VALUE = 'VALUE',
    POSITION = 'POSITION',
    PITCH = 'PITCH',
    INTENSITY = 'INTENSITY',
}

export {
    Note,
    Feature,
    ScaleProperties,
    ComputeScalePropertiesParameters,
    CompileSoundsOptions,
    PositionFeature,
    AbstractName,
}
