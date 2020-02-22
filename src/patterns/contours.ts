// tslint:disable no-magic-numbers

import { as, ContourElement, ContourPiece, sum } from '@musical-patterns/utilities'
import { STANDARD_PITCH_INDEX_INDICATING_REST } from './constants'
import { PitchValue } from './types'

const computeTotalPitchValueContourValue: (contour: ContourPiece<PitchValue>) => number =
    (contour: ContourPiece<PitchValue>): number =>
        contour.reduce(
            (accumulator: number, contourElement: ContourElement<PitchValue>): number => {
                const duration: number = contourElement[ 1 ]

                return sum(accumulator, duration)
            },
            0,
        )

const pitchValueRest: (duration: number) => ContourPiece<PitchValue> =
    (duration: number): ContourPiece<PitchValue> =>
        as.ContourPiece<PitchValue>([ [ as.number(STANDARD_PITCH_INDEX_INDICATING_REST), duration ] ])

export {
    computeTotalPitchValueContourValue,
    pitchValueRest,
}
