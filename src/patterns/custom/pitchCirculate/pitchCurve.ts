import {
    as,
    Cardinal,
    Frequency,
    Hz,
    insteadOf,

    Ordinal,
    Scalar,
    Transition,
    use,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters, WindowSize } from './types'

const transposePitchIndexForTier: (
    originalPitchIndex: Ordinal<Hz[]>,
    parameters: { pitchClassCount: Cardinal, tierIndex: Ordinal<WindowSize[]> },
) => Ordinal<Hz[]> =
    (
        originalPitchIndex: Ordinal<Hz[]>,
        { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters,
    ): Ordinal<Hz[]> => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Ordinal<Hz[]> =
            use.Remaindee(
                originalPitchIndex,
                as.Remaindee<Ordinal<Hz[]>>(as.number(pitchClassCount)),
            )

        const baseTierTransposition: Transition<Hz[]> =
            as.Transition<Hz[]>(as.number(use.Multiple(
                tierIndex,
                as.Factor<WindowSize[]>(as.number(pitchClassCount)),
            )))

        return use.Cardinal(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            insteadOf<Cardinal, Ordinal<Hz[]>>(baseTierTransposition),
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { tierIndex: Ordinal<WindowSize[]>, windowSize: WindowSize },
) => Scalar<Frequency> =
    (
        originalPitchScalar: Scalar<Frequency>,
        { windowSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Frequency> => {
        const pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation: Scalar<Frequency> = windowReduce(
            originalPitchScalar,
            windowSize,
        )

        const baseTierScaling: WindowSize = use.Power(
            windowSize,
            as.Power<WindowSize>(as.number(tierIndex)),
        )

        return use.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
