import { as, Duration, Ms, Point, Scalar } from '@musical-patterns/utilities'
import { computeNotesTotalCompiledDuration, Note, Scale } from '../../../../src/indexForTest'

describe('total compiled duration', () => {
    describe('of notes', () => {
        it('tells you how long a set of note are going to take to play once compiled', () => {
            const notes: Note[] = [
                {
                    duration: {
                        scalar: as.Scalar<Duration>(2),
                    },
                },
                {
                    duration: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(1),
                    },
                },
            ]
            const scales: Scale[] = [
                { scalars: [ 5, 7 ].map(as.Scalar) },
            ]

            const actual: Duration = computeNotesTotalCompiledDuration(notes, scales)

            expect(actual)
                .toBe(as.Translation<Point<Ms>>(17))
        })
    })
})
