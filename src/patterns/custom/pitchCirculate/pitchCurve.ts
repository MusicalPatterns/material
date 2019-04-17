import {
    apply,
    Cardinal,
    Frequency,
    from,
    Hz,
    Index,
    insteadOf,
    Scalar,
    to,
    Translation,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters, WindowSize } from './types'

const transposePitchIndexForTier: (
    originalPitchIndex: Index<Hz>,
    parameters: { pitchClassCount: Cardinal, tierIndex: Index<Scalar<Scalar<Frequency>>> },
) => Index<Hz> =
    (originalPitchIndex: Index<Hz>, { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters): Index<Hz> => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Index<Hz> =
            apply.Modulus(
                originalPitchIndex,
                to.Modulus<Index<Hz>>(from.Cardinal(pitchClassCount)),
            )

        const baseTierTransposition: Translation<Index<Hz>> =
            to.Translation<Index<Hz>>(from.Index<Scalar<Scalar<Frequency>>>(apply.Scalar(
                tierIndex,
                to.Scalar<Index<Scalar<Scalar<Frequency>>>>(from.Cardinal(pitchClassCount)),
            )))

        return apply.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            insteadOf<Translation, Index<Hz>>(baseTierTransposition),
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { tierIndex: Index<Scalar<Scalar<Frequency>>>, windowSize: WindowSize },
) => Scalar<Frequency> =
    (
        originalPitchScalar: Scalar<Frequency>,
        { windowSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Frequency> => {
        const pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation: Scalar<Frequency> = windowReduce(
            originalPitchScalar,
            windowSize,
        )

        const baseTierScaling: WindowSize = apply.Power(
            windowSize,
            to.Power<Scalar<Scalar<Frequency>>>(from.Index<Scalar<Scalar<Frequency>>>(tierIndex)),
        )

        return apply.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
