import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    as,
    Duration,
    Gain,
    Hz,
    Integer,
    Ms,
    ONE,
    Pitch,
    range,
    reciprocal,
    Translation,
} from '@musical-patterns/utilities'
import { Scale } from '../types'
// tslint:disable-next-line max-line-length
import { ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD } from './constants'
import { MaterializeStandardScalesOptions } from './types'

const computeNonScale: <NumericType extends Number = number>() => Scale<NumericType> =
    <NumericType extends Number = number>(): Scale<NumericType> => ({})

const computeHarmonicSeriesScale: <NumericType extends Number = Pitch>() => Scale<NumericType> =
    <NumericType extends Number = Pitch>(): Scale<NumericType> => ({
        scalars: range(
            ONE,
            ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD,
        )
            .map((integer: Integer) => as.Scalar<NumericType>(integer)),
    })

const computeSubharmonicSeriesScale: <NumericType extends Number = Pitch>() => Scale<NumericType> =
    <NumericType extends Number = Pitch>(): Scale<NumericType> => ({
        scalars: range(
            ONE,
            ENOUGH_HARMONIC_SERIES_STEPS_TO_LEAVE_HUMAN_HEARING_RANGE_FROM_THREE_OCTAVES_BELOW_PITCH_STANDARD,
        )
            .map((integer: Integer) => as.Scalar<NumericType>(reciprocal(integer))),
    })

const computeFlatDurationsScale: () => Scale<Duration> =
    // tslint:disable-next-line no-unnecessary-callback-wrapper
    (): Scale<Duration> =>
        computeHarmonicSeriesScale()

const materializeStandardScales:
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        options?: MaterializeStandardScalesOptions,
        // tslint:disable-next-line no-any
    ) => [ Scale<Gain>, Scale<Duration>, Scale<Pitch> ] & Array<Scale<any>> =
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        { durationScalars, pitchScalars }: MaterializeStandardScalesOptions = {},
        // tslint:disable-next-line no-any
    ): [ Scale<Gain>, Scale<Duration>, Scale<Pitch> ] & Array<Scale<any>> => {
        const gainScale: Scale<Gain> = computeNonScale()
        const basisDuration: Duration = specs[ StandardSpec.BASIS_DURATION ] || as.Delta<Ms>(1)
        const basisDurationTranslation: Translation<Duration> =
            specs[ StandardSpec.BASIS_DURATION_TRANSLATION ] || as.Translation<Duration>(0)
        const durationsScale: Scale<Duration> = {
            basis: basisDuration,
            scalars: durationScalars,
            translation: basisDurationTranslation,
        }
        const basisFrequency: Pitch = specs[ StandardSpec.BASIS_FREQUENCY ] || as.Point<Hz>(1)
        const basisFrequencyTranslation: Translation<Pitch> =
            specs[ StandardSpec.BASIS_FREQUENCY_TRANSLATION ] || as.Translation<Pitch>(0)
        const pitchesScale: Scale<Pitch> = {
            basis: basisFrequency,
            scalars: pitchScalars,
            translation: basisFrequencyTranslation,
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    materializeStandardScales,
    computeNonScale,
    computeFlatDurationsScale,
    computeHarmonicSeriesScale,
    computeSubharmonicSeriesScale,
}
