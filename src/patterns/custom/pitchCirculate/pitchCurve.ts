import {
    apply,
    Cardinal,
    Frequency,
    from,
    Index,
    Scalar,
    to,
    Translation,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters } from './types'

const transposePitchIndexForTier:
    (originalPitchIndex: Index, parameters: { pitchClassCount: Cardinal, tierIndex: Index }) => Index =
    (originalPitchIndex: Index, { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters): Index => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Index = apply.Modulus(
            originalPitchIndex,
            to.Modulus(to.Index(from.Cardinal(pitchClassCount))),
        )

        const baseTierTransposition: Translation<Index> = to.Translation(apply.Scalar(
            tierIndex,
            to.Scalar(to.Index(from.Cardinal(pitchClassCount))),
        ))

        return apply.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            baseTierTransposition,
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
            apply.Power(windowSize, to.Power(to.Scalar(to.Scalar(to.Frequency(from.Index<number, Index>(tierIndex))))))

        return apply.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
