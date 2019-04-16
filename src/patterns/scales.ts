import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    Amplitude,
    apply,
    Base,
    Frequency,
    from,
    Hz,
    Integer,
    Ms,
    NO_TRANSLATION,
    OCTAVE,
    POSITIVE_INTEGERS,
    Power,
    reciprocal,
    Scalar,
    to,
    Translation,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { Scale } from '../types'
import { MaterializeStandardScalesOptions } from './types'

const computeNonScale: <NumericType extends Number = number>() => Scale<NumericType> =
    <NumericType extends Number = number>(): Scale<NumericType> => ({})

const computeHarmonicSeriesScale: <NumericType extends Number = Hz>() => Scale<NumericType> =
    <NumericType extends Number = Hz>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => integer as unknown as Scalar<NumericType>),
    })

const computeSubharmonicSeriesScale: <NumericType extends Number = Hz>() => Scale<NumericType> =
    <NumericType extends Number = Hz>(): Scale<NumericType> => ({
        scalars: POSITIVE_INTEGERS.map((integer: Integer) => reciprocal(integer) as unknown as Scalar<NumericType>),
    })

const computeFlatDurationsScale: () => Scale<Ms> =
    // tslint:disable-next-line no-unnecessary-callback-wrapper
    (): Scale<Ms> =>
        computeHarmonicSeriesScale()

const computeOctaveSeriesScale: () => Scale<Hz> =
    (): Scale<Hz> => ({
        scalars: ZERO_AND_POSITIVE_INTEGERS
            .map((integer: Integer) => to.Power<Base<Frequency>>(integer))
            .map((power: Power<Base<Frequency>>): Scalar<Hz> =>
                to.Scalar<Hz>(from.Base<Frequency>(apply.Power(
                    OCTAVE,
                    power,
                ))),
            ),
    })

const materializeStandardScales:
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        options?: MaterializeStandardScalesOptions,
    ) => [ Scale<Amplitude>, Scale<Ms>, Scale<Hz> ] =
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        { durationScalars, pitchScalars }: MaterializeStandardScalesOptions = {},
    ): [ Scale<Amplitude>, Scale<Ms>, Scale<Hz> ] => {
        const gainScale: Scale<Amplitude> = computeNonScale()
        const durationScalar: Scalar<Ms> = specs[ StandardSpec.BASE_DURATION ] || to.Scalar<Ms>(1)
        const durationTranslation: Translation<Ms> = specs[ StandardSpec.BASE_DURATION_TRANSLATION ] || NO_TRANSLATION
        const durationsScale: Scale<Ms> = {
            scalar: durationScalar,
            scalars: durationScalars,
            translation: durationTranslation,
        }
        const pitchesScalar: Scalar<Hz> = specs[ StandardSpec.BASE_FREQUENCY ] || to.Scalar<Hz>(1)
        const pitchesTranslation: Translation<Hz> = specs[ StandardSpec.BASE_FREQUENCY_TRANSLATION ] || NO_TRANSLATION
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
