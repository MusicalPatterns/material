import {
    apply,
    Cardinal,
    Frequency,
    from,
    Hz,
    insteadOf,
    Ordinal,
    Scalar,
    to,
    Translation,
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
            apply.Modulus(
                originalPitchIndex,
                to.Modulus<Ordinal<Hz>>(from.Cardinal(pitchClassCount)),
            )

        const baseTierTransposition: Translation<Ordinal<Hz>> =
            to.Translation<Ordinal<Hz>>(from.Ordinal<Scalar<Scalar<Frequency>>>(apply.Scalar(
                tierIndex,
                to.Scalar<Ordinal<Scalar<Scalar<Frequency>>>>(from.Cardinal(pitchClassCount)),
            )))

        return apply.Translation(
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

        const baseTierScaling: WindowSize = apply.Power(
            windowSize,
            to.Power<Scalar<Scalar<Frequency>>>(from.Ordinal<Scalar<Scalar<Frequency>>>(tierIndex)),
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
