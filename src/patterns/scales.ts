// tslint:disable max-file-line-count

import { StandardSpec, StandardSpecs } from '@musical-patterns/spec'
import {
    as,
    Duration,
    Gain,
    Integer,
    musicalAs,
    ONE,
    Pitch,
    Position,
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
    ) => [
        Scale<Gain>,
        Scale<Duration>,
        Scale<Pitch>,
        Scale<Position>,
        Scale<Position>,
        Scale<Position>
        // tslint:disable-next-line no-any
        ] & Array<Scale<any>> =
    // tslint:disable-next-line cyclomatic-complexity
    <SpecsType extends StandardSpecs>(
        specs: SpecsType,
        { durationScalars, pitchScalars }: MaterializeStandardScalesOptions = {},
    ): [
        Scale<Gain>,
        Scale<Duration>,
        Scale<Pitch>,
        Scale<Position>,
        Scale<Position>,
        Scale<Position>
        // tslint:disable-next-line no-any
        ] & Array<Scale<any>> => {
        const gainScale: Scale<Gain> = computeNonScale()

        const basisDuration: Duration = specs[ StandardSpec.BASIS_DURATION ] || musicalAs.Duration(1)
        const basisDurationTranslation: Translation<Duration> =
            specs[ StandardSpec.BASIS_DURATION_TRANSLATION ] || as.Translation<Duration>(0)
        const durationsScale: Scale<Duration> = {
            basis: basisDuration,
            scalars: durationScalars,
            translation: basisDurationTranslation,
        }

        const basisFrequency: Pitch = specs[ StandardSpec.BASIS_FREQUENCY ] || musicalAs.Pitch(1)
        const basisFrequencyTranslation: Translation<Pitch> =
            specs[ StandardSpec.BASIS_FREQUENCY_TRANSLATION ] || as.Translation<Pitch>(0)
        const pitchesScale: Scale<Pitch> = {
            basis: basisFrequency,
            scalars: pitchScalars,
            translation: basisFrequencyTranslation,
        }

        const basisPosition: Position = specs[ StandardSpec.BASIS_POSITION ] || musicalAs.Position(1)
        const basisPositionTranslation: Array<Translation<Position>> =
            specs[ StandardSpec.BASIS_POSITION_TRANSLATION ] ||
            [ 0, 0, 0 ].map((dimension: number) => as.Translation<Position>(dimension))
        const xScale: Scale<Position> = {
            basis: basisPosition,
            translation: basisPositionTranslation[ 0 ],
        }
        const yScale: Scale<Position> = {
            basis: basisPosition,
            translation: basisPositionTranslation[ 0 ],
        }
        const zScale: Scale<Position> = {
            basis: basisPosition,
            translation: basisPositionTranslation[ 0 ],
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
            xScale,
            yScale,
            zScale,
        ]
    }

export {
    materializeStandardScales,
    computeNonScale,
    computeFlatDurationsScale,
    computeHarmonicSeriesScale,
    computeSubharmonicSeriesScale,
}
