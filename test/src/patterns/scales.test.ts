import { as, Pitch, Scalar } from '@musical-patterns/utilities'
import { computeOctaveSeriesScale, Scale } from '../../../src/indexForTest'

describe('scales utilities', () => {
    describe('octave series scale', () => {
        it('scalars increase by factor of 2 each step', () => {
            const octaveSeriesScale: Scale<Pitch> = computeOctaveSeriesScale()

            const scalars: Array<Scalar<Pitch>> = octaveSeriesScale.scalars!
            expect(scalars[ 0 ])
                .toEqual(as.Scalar<Pitch>(1))
            expect(scalars[ 1 ])
                .toEqual(as.Scalar<Pitch>(2))
            expect(scalars[ 2 ])
                .toEqual(as.Scalar<Pitch>(4))
            expect(scalars[ 3 ])
                .toEqual(as.Scalar<Pitch>(8))
            expect(scalars[ 4 ])
                .toEqual(as.Scalar<Pitch>(16))
            expect(scalars[ 5 ])
                .toEqual(as.Scalar<Pitch>(32))
        })
    })
})
