import { Scalar, to } from '@musical-patterns/utilities'
import { computeOctaveSeriesScale, Scale } from '../../../src/indexForTest'

describe('scales utilities', () => {
    describe('octave series scale', () => {
        it('scalars increase by factor of 2 each step', () => {
            const octaveSeriesScale: Scale = computeOctaveSeriesScale()

            const scalars: Scalar[] = octaveSeriesScale.scalars!
            expect(scalars[ 0 ])
                .toEqual(to.Scalar(1))
            expect(scalars[ 1 ])
                .toEqual(to.Scalar(2))
            expect(scalars[ 2 ])
                .toEqual(to.Scalar(4))
            expect(scalars[ 3 ])
                .toEqual(to.Scalar(8))
            expect(scalars[ 4 ])
                .toEqual(to.Scalar(16))
            expect(scalars[ 5 ])
                .toEqual(to.Scalar(32))
        })
    })
})
