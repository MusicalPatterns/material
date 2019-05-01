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
import { AbstractToPhysical, Scale, Scales } from '../../types'
import { COMPILER_PRECISION } from './constants'
import { AbstractName, CompileSoundsOptions, ComputeScalePropertiesParameters, Feature, ScaleProperties } from './types'

const emptyScales: Scales = {}

const computeScaleProperties: <FeatureType extends Number = number>(scaleStuffParameters: {
    abstractName: AbstractName,
    index: Ordinal<Array<Scalar<FeatureType>>>,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal<Array<Scale<FeatureType>>>,
}) => ScaleProperties<FeatureType> =
    <FeatureType extends Number = number>(
        {
            abstractName,
            index,
            scaleIndex,
            options,
        }: ComputeScalePropertiesParameters<FeatureType>,
    ): ScaleProperties<FeatureType> => {
        const { scales = emptyScales } = options || {}
        const scale: Scale<FeatureType> = isEmpty((scales[ abstractName ] || []) as Array<Scale<FeatureType>>) ?
            { scalars: [] } :
            use.Ordinal(scales[ abstractName ] as Array<Scale<FeatureType>>, scaleIndex)
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            basis: basis = 1 as unknown as AbstractToPhysical<FeatureType>,
            scalars = [],
        } = scale

        const scaleScalar: Maybe<Scalar<FeatureType>> = isEmpty(scalars) ?
            undefined :
            use.Ordinal(scalars, index)

        return { scaleTranslation, basis, scaleScalar }
    }

const compileSoundFeature: <FeatureType extends Number = number>(
    noteFeature: Feature<FeatureType>, abstractName: AbstractName, options?: { scales?: Scales },
) => AbstractToPhysical<FeatureType> =
    <FeatureType extends Number = number>(
        noteFeature: Feature<FeatureType>, abstractName: AbstractName, options?: CompileSoundsOptions,
    ): AbstractToPhysical<FeatureType> => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        } = noteFeature

        const { basis, scaleScalar, scaleTranslation } = computeScaleProperties({
            abstractName,
            index,
            options,
            scaleIndex,
        })

        let soundFeature: AbstractToPhysical<FeatureType> = basis

        soundFeature = use.Scalar(
            soundFeature,
            insteadOf<Scalar, AbstractToPhysical<FeatureType>>(noteScalar),
        )
        soundFeature = use.Scalar(
            soundFeature,
            insteadOf<Scalar, AbstractToPhysical<FeatureType>>(scaleScalar || MULTIPLICATIVE_IDENTITY),
        )

        soundFeature = use.Translation(
            soundFeature,
            insteadOf<Translation, AbstractToPhysical<FeatureType>>(noteTranslation),
        )
        soundFeature = use.Translation(
            soundFeature,
            insteadOf<Translation, AbstractToPhysical<FeatureType>>(scaleTranslation),
        )

        return round(soundFeature, COMPILER_PRECISION)
    }

export {
    compileSoundFeature,
}
