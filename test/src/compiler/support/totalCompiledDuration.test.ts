import { Ms, to } from '@musical-patterns/utilities'
import { computeNotesTotalCompiledDuration, Note, Scale } from '../../../../src/indexForTest'

describe('total compiled duration', () => {
    describe('of notes', () => {
        it('tells you how long a set of note are going to take to play once compiled', () => {
            const notes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(2),
                    },
                },
                {
                    duration: {
                        index: to.Ordinal(1),
                    },
                },
            ]
            const scales: Scale[] = [
                { scalars: [ 5, 7 ].map(to.Scalar) },
            ]

            const actual: Ms = computeNotesTotalCompiledDuration(notes, scales)

            expect(actual)
                .toBe(to.Ms(17))
        })
    })
})
