import {
    as,
    Cardinal,
    Frequency,
    Hz,
    insteadOf,
    notAs,
    Ordinal,
    Scalar,
    Translation,
    use,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters, WindowSize } from './types'

const transposePitchIndexForTier: (
    originalPitchIndex: Ordinal<Hz>,
    parameters: { pitchClassCount: Cardinal, tierIndex: Ordinal<Scalar<Scalar<Frequency>>> },
) => Ordinal<Hz> =
    (
        originalPitchIndex: Ordinal<Hz>,
        { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters,
    ): Ordinal<Hz> => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Ordinal<Hz> =
            use.IntegerModulus(
                originalPitchIndex,
                as.IntegerModulus<Ordinal<Hz>>(notAs.Cardinal(pitchClassCount)),
            )

        const baseTierTransposition: Translation<Ordinal<Hz>> =
            as.Translation<Ordinal<Hz>>(notAs.Ordinal<Scalar<Scalar<Frequency>>>(use.Multiple(
                tierIndex,
                as.Multiple<Ordinal<Scalar<Scalar<Frequency>>>>(notAs.Cardinal(pitchClassCount)),
            )))

        return use.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            insteadOf<Translation, Ordinal<Hz>>(baseTierTransposition),
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { tierIndex: Ordinal<Scalar<Scalar<Frequency>>>, windowSize: WindowSize },
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
            as.Power<Scalar<Scalar<Frequency>>>(notAs.Ordinal<Scalar<Scalar<Frequency>>>(tierIndex)),
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
