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
import { Scale } from '../../types'
import { SoundFeature } from '../nominals'
import { COMPILER_PRECISION } from './constants'
import { CompileSoundsOptions, ComputeScalePropertiesParameters, NoteFeature, ScaleProperties } from './types'

const computeScaleProperties: (scaleStuffParameters: {
    index: Ordinal<Scalar[]>,
    options?: CompileSoundsOptions,
    scaleIndex: Ordinal<Scale[]>,
}) => ScaleProperties =
    ({ index, scaleIndex, options }: ComputeScalePropertiesParameters): ScaleProperties => {
        const { scales = [] } = options || {}
        const scale: Scale = isEmpty(scales) ? { scalars: [] } : use.Ordinal(scales, scaleIndex)
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            scalar: scaleScalar = MULTIPLICATIVE_IDENTITY,
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<SoundFeature> = isEmpty(scalars) ?
            undefined :
            use.Ordinal(scalars, index)

        return { scaleTranslation, scaleScalar, scaleElement }
    }

const compileSoundFeature:
    <SoundFeatureType extends SoundFeature>(
        noteFeature: NoteFeature, options?: { scales?: Scale[] },
    ) => SoundFeatureType =
    <SoundFeatureType extends SoundFeature>(
        noteFeature: NoteFeature, options?: CompileSoundsOptions,
    ): SoundFeatureType => {
        const {
            index = INITIAL,
            translation: noteTranslation = ADDITIVE_IDENTITY,
            scalar: noteScalar = MULTIPLICATIVE_IDENTITY,
            scaleIndex = INITIAL,
        }: NoteFeature = noteFeature

        const { scaleElement, scaleScalar, scaleTranslation } = computeScaleProperties({ index, scaleIndex, options })

        let soundFeature: SoundFeature = scaleElement || MULTIPLICATIVE_IDENTITY

        soundFeature = use.Scalar(soundFeature, insteadOf<Scalar, SoundFeature>(noteScalar))
        soundFeature = use.Scalar(soundFeature, insteadOf<Scalar, SoundFeature>(scaleScalar))

        soundFeature = use.Translation(soundFeature, insteadOf<Translation, SoundFeature>(noteTranslation))
        soundFeature = use.Translation(soundFeature, insteadOf<Translation, SoundFeature>(scaleTranslation))

        return round(soundFeature, COMPILER_PRECISION) as SoundFeatureType
    }

export {
    compileSoundFeature,
}
