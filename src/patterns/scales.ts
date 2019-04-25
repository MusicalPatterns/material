import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    as,
    Base,
    Duration,
    Frequency,
    Gain,
    Hz,
    Integer,
    Ms,
    notAs,
    OCTAVE,
    Pitch,
    Point,
    POSITIVE_INTEGERS,
    Power,
    reciprocal,
    Scalar,
    Translation,
    use,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { Scale } from '../types'
import { MaterializeStandardScalesOptions } from './types'

const computeNonScale: <NumericType extends Number = number>() => Scale<NumericType> =
    <NumericType extends Number = number>(): Scale<NumericType> => ({})

const computeHarmonicSeriesScale: <NumericType extends Number = Pitch>() => Scale<NumericType> =
    <NumericType extends Number = Pitch>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => as.Scalar<NumericType>(integer)),
    })

const computeSubharmonicSeriesScale: <NumericType extends Number = Pitch>() => Scale<NumericType> =
    <NumericType extends Number = Pitch>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => as.Scalar<NumericType>(reciprocal(integer))),
    })

const computeFlatDurationsScale: () => Scale<Duration> =
    // tslint:disable-next-line no-unnecessary-callback-wrapper
    (): Scale<Duration> =>
        computeHarmonicSeriesScale()

const computeOctaveSeriesScale: () => Scale<Pitch> =
    (): Scale<Pitch> => ({
        scalars: ZERO_AND_POSITIVE_INTEGERS
            .map((integer: Integer) => as.Power<Base<Frequency>>(integer))
            .map((power: Power<Base<Frequency>>): Scalar<Pitch> =>
                as.Scalar<Pitch>(notAs.Base<Frequency>(use.Power(
                    OCTAVE,
                    power,
                ))),
            ),
    })

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
        const basisDuration: Duration = specs[ StandardSpec.BASIS_DURATION ] || as.Translation<Point<Ms>>(1)
        const basisDurationTranslation: Translation<Duration> =
            specs[ StandardSpec.BASIS_DURATION_TRANSLATION ] || as.Translation<Duration>(0)
        const durationsScale: Scale<Duration> = {
            basis: basisDuration,
            scalars: durationScalars,
            translation: basisDurationTranslation,
        }
        const basisFrequency: Point<Hz> = specs[ StandardSpec.BASIS_FREQUENCY ] || as.Point<Hz>(1)
        const basisFrequencyTranslation: Translation<Point<Hz>> =
            specs[ StandardSpec.BASIS_FREQUENCY_TRANSLATION ] || as.Translation<Point<Hz>>(0)
        const pitchesScale: Scale<Point<Hz>> = {
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
    computeOctaveSeriesScale,
    computeSubharmonicSeriesScale,
}
