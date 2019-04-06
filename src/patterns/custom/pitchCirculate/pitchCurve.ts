import {
    apply,
    Cardinal,
    Frequency,
    from,
    Ordinal,
    Scalar,
    to,
    Translation,
    windowReduce,
} from '@musical-patterns/utilities'
import { ComputeCircledPitchIndexParameters, ComputeCircledPitchScalarParameters } from './types'

const transposePitchIndexForTier:
    (originalPitchIndex: Ordinal, parameters: { pitchClassCount: Cardinal, tierIndex: Ordinal }) => Ordinal =
    (originalPitchIndex: Ordinal, { pitchClassCount, tierIndex }: ComputeCircledPitchIndexParameters): Ordinal => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Ordinal = apply.Modulus(
            originalPitchIndex,
            to.Modulus(from.Cardinal(pitchClassCount)),
        )

        const baseTierTransposition: Translation = to.Translation(from.Ordinal(apply.Scalar(
            tierIndex,
            to.Scalar(from.Cardinal(pitchClassCount)),
        )))

        return apply.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            baseTierTransposition,
        )
    }

const scalePitchScalarForTier: (
    originalPitchScalar: Scalar<Frequency>,
    parameters: { tierIndex: Ordinal, windowSize: Scalar<Frequency> },
) => Scalar<Frequency> =
    (
        originalPitchScalar: Scalar<Frequency>,
        { windowSize, tierIndex }: ComputeCircledPitchScalarParameters,
    ): Scalar<Frequency> => {
        const pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation: Scalar<Frequency> = windowReduce(
            originalPitchScalar,
            windowSize,
        )

        const baseTierScaling: Scalar<Frequency> = apply.Power(windowSize, to.Power(from.Ordinal(tierIndex)))

        return apply.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

export {
    scalePitchScalarForTier,
    transposePitchIndexForTier,
}
