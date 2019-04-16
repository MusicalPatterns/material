import { Hz, Scalar, to } from '@musical-patterns/utilities'
import { computeOctaveSeriesScale, Scale } from '../../../src/indexForTest'

describe('scales utilities', () => {
    describe('octave series scale', () => {
        it('scalars increase by factor of 2 each step', () => {
            const octaveSeriesScale: Scale<Hz> = computeOctaveSeriesScale()

            const scalars: Array<Scalar<Hz>> = octaveSeriesScale.scalars!
            expect(scalars[ 0 ])
                .toEqual(to.Scalar<Hz>(1))
            expect(scalars[ 1 ])
                .toEqual(to.Scalar<Hz>(2))
            expect(scalars[ 2 ])
                .toEqual(to.Scalar<Hz>(4))
            expect(scalars[ 3 ])
                .toEqual(to.Scalar<Hz>(8))
            expect(scalars[ 4 ])
                .toEqual(to.Scalar<Hz>(16))
            expect(scalars[ 5 ])
                .toEqual(to.Scalar<Hz>(32))
        })
    })
})
