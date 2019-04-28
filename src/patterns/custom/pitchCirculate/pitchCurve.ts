import {
    as,
    Cardinal,
    Frequency,
    Hz,
    insteadOf,
    Ordinal,
    periodReduce,
    Scalar,
    Transition,
    use,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters, PeriodSize } from './types'

const transposePitchIndexForTier: (
    originalPitchIndex: Ordinal<Hz[]>,
    parameters: { pitchClassCount: Cardinal, tierIndex: Ordinal<PeriodSize[]> },
) => Ordinal<Hz[]> =
    (
        originalPitchIndex: Ordinal<Hz[]>,
        { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters,
    ): Ordinal<Hz[]> => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalPeriodLocationInformation: Ordinal<Hz[]> =
            use.Remaindee(
                originalPitchIndex,
                as.Remaindee<Ordinal<Hz[]>>(as.number(pitchClassCount)),
            )

        const baseTierTransposition: Transition<Hz[]> =
            as.Transition<Hz[]>(as.number(use.Multiple(
                tierIndex,
                as.Factor<PeriodSize[]>(as.number(pitchClassCount)),
            )))

        return use.Cardinal(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalPeriodLocationInformation,
            insteadOf<Cardinal, Ordinal<Hz[]>>(baseTierTransposition),
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { periodSize: PeriodSize, tierIndex: Ordinal<PeriodSize[]> },
) => Scalar<Frequency> =
    (
        originalPitchScalar: Scalar<Frequency>,
        { periodSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Frequency> => {
        const pitchScalarReducedWithinPeriodSizeToRemovePeriodLocationInformation: Scalar<Frequency> = periodReduce(
            originalPitchScalar,
            periodSize,
        )

        const baseTierScaling: PeriodSize = use.Power(
            periodSize,
            as.Power<PeriodSize>(as.number(tierIndex)),
        )

        return use.Scalar(
            pitchScalarReducedWithinPeriodSizeToRemovePeriodLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
