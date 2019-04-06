// tslint:disable no-magic-numbers

import { ContourElement, ContourPiece, sum, to } from '@musical-patterns/utilities'
import { STANDARD_PITCH_INDEX_INDICATING_REST } from './constants'
import { PitchDuration } from './types'

const computeTotalPitchDurationContourDuration: (contour: ContourPiece<PitchDuration>) => number =
    (contour: ContourPiece<PitchDuration>): number =>
        contour.reduce(
            (accumulator: number, contourElement: ContourElement<PitchDuration>) => {
                const duration: number = contourElement[ 1 ]

                return sum(accumulator, duration)
            },
            0,
        )

const pitchDurationRest: (duration: number) => ContourPiece<PitchDuration> =
    (duration: number): ContourPiece<PitchDuration> =>
        to.ContourPiece<PitchDuration>([ [ STANDARD_PITCH_INDEX_INDICATING_REST, duration ] ])

export {
    computeTotalPitchDurationContourDuration,
    pitchDurationRest,
}
