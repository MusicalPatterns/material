import { as, Ms, Scalar, Translation } from '@musical-patterns/utilities'
import { computeNotesTotalCompiledDuration, Note, Scale } from '../../../../src/indexForTest'

describe('total compiled duration', () => {
    describe('of notes', () => {
        it('tells you how long a set of note are going to take to play once compiled', () => {
            const notes: Note[] = [
                {
                    duration: {
                        scalar: as.Scalar<Scalar>(2),
                    },
                },
                {
                    duration: {
                        index: as.Ordinal<Scalar[]>(1),
                    },
                },
            ]
            const scales: Scale[] = [
                { scalars: [ 5, 7 ].map(as.Scalar) },
            ]

            const actual: Translation<Ms> = computeNotesTotalCompiledDuration(notes, scales)

            expect(actual)
                .toBe(as.Translation<Ms>(17))
        })
    })
})
