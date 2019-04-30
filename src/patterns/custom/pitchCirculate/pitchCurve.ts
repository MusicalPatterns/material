import {
    as,
    Cardinal,
    Hz,
    insteadOf,
    Ordinal,
    periodReduce,
    Pitch,
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
    originalPitchScalar: Scalar<Pitch>,
    parameters: { periodSize: PeriodSize, tierIndex: Ordinal<PeriodSize[]> },
) => Scalar<Pitch> =
    (
        originalPitchScalar: Scalar<Pitch>,
        { periodSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Pitch> => {
        const pitchScalarReducedWithinPeriodSizeToRemovePeriodLocationInformation: Scalar<Pitch> = periodReduce(
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
