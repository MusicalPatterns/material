import {
    ADDITIVE_IDENTITY,
    INITIAL,
    insteadOf,
    isEmpty,
    Maybe,
    MULTIPLICATIVE_IDENTITY,
    Ordinal,
    round,
    Scalar,
    Translation,
    use,
} from '@musical-patterns/utilities'
import { AbstractToPhysical, Scale } from '../../types'
import { COMPILER_PRECISION } from './constants'
import { CompileSoundsOptions, ComputeScalePropertiesParameters, Feature, ScaleProperties } from './types'

const computeScaleProperties: <FeatureType extends Number = number>(scaleStuffParameters: {
    index: Ordinal<Array<Scalar<FeatureType>>>,
    options?: CompileSoundsOptions<FeatureType>,
    scaleIndex: Ordinal<Array<Scale<FeatureType>>>,
}) => ScaleProperties<FeatureType> =
    <FeatureType extends Number = number>(
        {
            index,
            scaleIndex,
            options,
        }: ComputeScalePropertiesParameters<FeatureType>,
    ): ScaleProperties<FeatureType> => {
        const { scales = [] } = options || {}
        const scale: Scale<FeatureType> = isEmpty(scales) ? { scalars: [] } : use.Ordinal(scales, scaleIndex)
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            basis: scaleBasis = 1 as unknown as AbstractToPhysical<FeatureType>,
            scalars = [],
        } = scale

        const scaleScalar: Maybe<Scalar<FeatureType>> = isEmpty(scalars) ?
            undefined :
            use.Ordinal(scalars, index)

        return { scaleTranslation, scaleBasis, scaleScalar }
    }

const compileSoundFeature: <FeatureType extends Number = number>(
    noteFeature: Feature<FeatureType>, options?: { scales?: Array<Scale<FeatureType>> },
) => AbstractToPhysical<FeatureType> =
    <FeatureType extends Number = number>(
        noteFeature: Feature<FeatureType>, options?: CompileSoundsOptions<FeatureType>,
    ): AbstractToPhysical<FeatureType> => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        } = noteFeature

        const { scaleBasis, scaleScalar, scaleTranslation } = computeScaleProperties({ index, scaleIndex, options })

        let soundFeature: AbstractToPhysical<FeatureType> = scaleBasis

        soundFeature = use.Scalar(
            soundFeature,
            insteadOf<Scalar, AbstractToPhysical<FeatureType>>(noteScalar)
        )
        soundFeature = use.Scalar(
            soundFeature,
            insteadOf<Scalar, AbstractToPhysical<FeatureType>>(scaleScalar || MULTIPLICATIVE_IDENTITY)
        )

        soundFeature = use.Translation(
            soundFeature,
            insteadOf<Translation, AbstractToPhysical<FeatureType>>(noteTranslation)
        )
        soundFeature = use.Translation(
            soundFeature,
            insteadOf<Translation, AbstractToPhysical<FeatureType>>(scaleTranslation)
        )

        return round(soundFeature, COMPILER_PRECISION)
    }

export {
    compileSoundFeature,
}
