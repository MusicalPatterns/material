import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    Amplitude,
    as,
    Base,
    Frequency,
    Hz,
    Integer,
    Ms,
    NO_SHIFT,
    notAs,
    OCTAVE,
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

const computeHarmonicSeriesScale: <NumericType extends Number = Hz>() => Scale<NumericType> =
    <NumericType extends Number = Hz>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => as.Scalar<NumericType>(integer)),
    })

const computeSubharmonicSeriesScale: <NumericType extends Number = Hz>() => Scale<NumericType> =
    <NumericType extends Number = Hz>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => as.Scalar<NumericType>(reciprocal(integer))),
    })

const computeFlatDurationsScale: () => Scale<Ms> =
    // tslint:disable-next-line no-unnecessary-callback-wrapper
    (): Scale<Ms> =>
        computeHarmonicSeriesScale()

const computeOctaveSeriesScale: () => Scale<Hz> =
    (): Scale<Hz> => ({
        scalars: ZERO_AND_POSITIVE_INTEGERS
            .map((integer: Integer) => as.Power<Base<Frequency>>(integer))
            .map((power: Power<Base<Frequency>>): Scalar<Hz> =>
                as.Scalar<Hz>(notAs.Base<Frequency>(use.Power(
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
    ) => [ Scale<Amplitude>, Scale<Ms>, Scale<Hz> ] & Array<Scale<any>> =
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        { durationScalars, pitchScalars }: MaterializeStandardScalesOptions = {},
        // tslint:disable-next-line no-any
    ): [ Scale<Amplitude>, Scale<Ms>, Scale<Hz> ] & Array<Scale<any>> => {
        const gainScale: Scale<Amplitude> = computeNonScale()
        const durationScalar: Scalar<Ms> = specs[ StandardSpec.BASE_DURATION ] || as.Scalar<Ms>(1)
        const durationTranslation: Translation<Ms> = specs[ StandardSpec.BASE_DURATION_TRANSLATION ] || NO_SHIFT
        const durationsScale: Scale<Ms> = {
            scalar: durationScalar,
            scalars: durationScalars,
            translation: durationTranslation,
        }
        const pitchesScalar: Scalar<Hz> = specs[ StandardSpec.BASE_FREQUENCY ] || as.Scalar<Hz>(1)
        const pitchesTranslation: Translation<Hz> = specs[ StandardSpec.BASE_FREQUENCY_TRANSLATION ] || NO_SHIFT
        const pitchesScale: Scale<Hz> = {
            scalar: pitchesScalar,
            scalars: pitchScalars,
            translation: pitchesTranslation,
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
