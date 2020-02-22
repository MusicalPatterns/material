import { as, ContourPiece } from '@musical-patterns/utilities'
import { computeTotalPitchValueContourValue, PitchValue } from '../../../src/indexForTest'

describe('contours utilities', (): void => {
    describe('total standard contour duration', (): void => {
        it('totals the durations of the contour, standard where first element is pitch and second is duration', (): void => {
            const contour: ContourPiece<PitchValue> = as.ContourPiece<PitchValue>([
                [ 1, 3 ], [ 0, 4 ], [ 7, 3 ],
            ])

            expect(computeTotalPitchValueContourValue(contour))
                .toBe(10)
        })
    })
})
