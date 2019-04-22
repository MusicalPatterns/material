import {
    as,
    Cardinal,
    Frequency,
    Hz,
    insteadOf,
    notAs,
    Ordinal,
    Scalar,
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
            use.IntegerModulus(
                originalPitchIndex,
                as.IntegerModulus<Ordinal<Hz[]>>(notAs.Cardinal(pitchClassCount)),
            )

        const baseTierTransposition: Cardinal<Ordinal<Hz>> =
            as.Cardinal<Ordinal<Hz>>(notAs.Ordinal<WindowSize[]>(use.Multiple(
                tierIndex,
                as.Multiple<Ordinal<WindowSize[]>>(notAs.Cardinal(pitchClassCount)),
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
            as.Power<WindowSize>(notAs.Ordinal<WindowSize[]>(tierIndex)),
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
