import {
    ADDITIVE_IDENTITY,
    apply,
    Index,
    INITIAL,
    isEmpty,
    Maybe,
    MULTIPLICATIVE_IDENTITY,
    round,
    Scalar,
    Translation,
} from '@musical-patterns/utilities'
import { Scale } from '../../types'
import { SoundFeature } from '../nominals'
import { COMPILER_PRECISION } from './constants'
import { CompileSoundsOptions, ComputeScalePropertiesParameters, NoteFeature, ScaleProperties } from './types'

const computeScaleProperties: (scaleStuffParameters: {
    index: Index,
    options?: CompileSoundsOptions,
    scaleIndex: Index,
}) => ScaleProperties =
    ({ index, scaleIndex, options }: ComputeScalePropertiesParameters): ScaleProperties => {
        const { scales = [] } = options || {}
        const scale: Scale = isEmpty(scales) ? { scalars: [] } : apply.Index(scales, scaleIndex as Index<Scale>)
        const {
            translation: scaleTranslation = ADDITIVE_IDENTITY,
            scalar: scaleScalar = MULTIPLICATIVE_IDENTITY,
            scalars = [],
        }: Scale = scale

        const scaleElement: Maybe<SoundFeature> = isEmpty(scalars) ?
            undefined :
            apply.Index(scalars, index as Index<Scalar>)

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

        soundFeature = apply.Scalar(soundFeature, noteScalar as Scalar<SoundFeature>)
        soundFeature = apply.Scalar(soundFeature, scaleScalar as Scalar<SoundFeature>)

        soundFeature = apply.Translation(soundFeature, noteTranslation as Translation<SoundFeature>)
        soundFeature = apply.Translation(soundFeature, scaleTranslation as Translation<SoundFeature>)

        return round(soundFeature, COMPILER_PRECISION) as SoundFeatureType
    }

export {
    compileSoundFeature,
}
