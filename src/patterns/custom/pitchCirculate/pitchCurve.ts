import {
    apply,
    Cardinal,
    Frequency,
    from,
    Hz,
    Index,
    insteadOf,
    ofOperation,
    Scalar,
    to,
    Translation,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters } from './types'

const transposePitchIndexForTier:
    (originalPitchIndex: Index<Hz>, parameters: { pitchClassCount: Cardinal, tierIndex: Index }) => Index<Hz> =
    (originalPitchIndex: Index<Hz>, { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters): Index<Hz> => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Index<Hz> =
            apply.Modulus(
                originalPitchIndex,
                to.Modulus<Index<Hz>>(from.Cardinal(pitchClassCount)),
            )

        const baseTierTransposition: Translation<Index> = to.Translation(ofOperation<'Index'>(apply.Scalar(
            tierIndex,
            to.Scalar<Index>(from.Cardinal(pitchClassCount)),
        )))

        return apply.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            insteadOf<Translation, Index<Hz>>(baseTierTransposition),
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { tierIndex: Index, windowSize: Scalar<Scalar<Frequency>> },
) => Scalar<Frequency> =
    (
        originalPitchScalar: Scalar<Frequency>,
        { windowSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Frequency> => {
        const pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation: Scalar<Frequency> = windowReduce(
            originalPitchScalar,
            windowSize,
        )

        const baseTierScaling: Scalar<Scalar<Frequency>> =
            apply.Power(windowSize, to.Power<Scalar<Scalar<Frequency>>>(from.Index(tierIndex)))

        return apply.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
