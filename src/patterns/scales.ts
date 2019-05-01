// tslint:disable max-file-line-count

import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    as,
    Duration,
    Integer,
    Intensity,
    Location,
    musicalAs,
    ONE,
    Pitch,
    Position,
    range,
    reciprocal,
    Scalar,
    Tone,
    Translation,
    Value,
} from '@musical-patterns/utilities'
import { AbstractName } from '../compiler'
import { Scale, Scales } from '../types'
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

const computeFlatValueScale: () => Scale<Value> =
    // tslint:disable-next-line no-unnecessary-callback-wrapper
    (): Scale<Value> =>
        computeHarmonicSeriesScale()

const materializeStandardScales:
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        options?: {
            pitchScalars?: Array<Scalar<Pitch>>,
            valueScalars?: Array<Scalar<Value>>,
        },
    ) => Scales =
    // tslint:disable-next-line cyclomatic-complexity
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        { valueScalars, pitchScalars }: MaterializeStandardScalesOptions = {},
    ): Scales => {
        const intensityScale: Scale<Intensity> = computeNonScale()

        const msPhysicalization: Duration = specs[ StandardSpec.MS_PHYSICALIZATION ] || musicalAs.Duration(1)
        const msPhysicalizationTranslation: Translation<Duration> =
            specs[ StandardSpec.MS_PHYSICALIZATION_TRANSLATION ] || as.Translation<Duration>(0)
        const valueScale: Scale<Value> = {
            basis: msPhysicalization,
            scalars: valueScalars,
            translation: msPhysicalizationTranslation,
        }

        const hzPhysicalization: Tone = specs[ StandardSpec.HZ_PHYSICALIZATION ] || musicalAs.Tone(1)
        const hzPhysicalizationTranslation: Translation<Tone> =
            specs[ StandardSpec.HZ_PHYSICALIZATION_TRANSLATION ] || as.Translation<Tone>(0)
        const pitchScale: Scale<Pitch> = {
            basis: hzPhysicalization,
            scalars: pitchScalars,
            translation: hzPhysicalizationTranslation,
        }

        const metersPhysicalization: Location = specs[ StandardSpec.METERS_PHYSICALIZATION ] || musicalAs.Location(1)
        const metersPhysicalizationTranslation: Array<Translation<Location>> =
            specs[ StandardSpec.METERS_PHYSICALIZATION_TRANSLATION ] ||
            [ 0, 0, 0 ].map((dimension: number) => as.Translation<Location>(dimension))
        const xScale: Scale<Position> = {
            basis: metersPhysicalization,
            translation: metersPhysicalizationTranslation[ 0 ],
        }
        const yScale: Scale<Position> = {
            basis: metersPhysicalization,
            translation: metersPhysicalizationTranslation[ 0 ],
        }
        const zScale: Scale<Position> = {
            basis: metersPhysicalization,
            translation: metersPhysicalizationTranslation[ 0 ],
        }

        return {
            [ AbstractName.INTENSITY ]: [ intensityScale ],
            [ AbstractName.VALUE ]: [ valueScale ],
            [ AbstractName.PITCH ]: [ pitchScale ],
            [ AbstractName.POSITION ]: [ xScale, yScale, zScale ],
        }
    }

export {
    materializeStandardScales,
    computeNonScale,
    computeFlatValueScale,
    computeHarmonicSeriesScale,
    computeSubharmonicSeriesScale,
}
