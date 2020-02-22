import { as, Scalar, Value } from '@musical-patterns/utilities'
import { computeNotesValueIndexSum, computeNotesValueScalarSum, Note } from '../../../src/indexForTest'

describe('notes utilities', (): void => {
    describe('notes total value by scalar', (): void => {
        it(`sums the scalars of each note's value`, (): void => {
            const notes: Note[] = [
                {
                    value: {
                        scalar: as.Scalar<Value>(4),
                    },
                },
                {
                    value: {
                        scalar: as.Scalar<Value>(7),
                    },
                },
                {
                    value: {
                        scalar: as.Scalar<Value>(8),
                    },
                },
            ]

            const notesValueScalarSum: number = computeNotesValueScalarSum(notes)

            expect(notesValueScalarSum)
                .toBe(19)
        })
    })

    describe('notes total value by scalar', (): void => {
        it(`sums the scalars of each note's value`, (): void => {
            const notes: Note[] = [
                {
                    value: {
                        index: as.Ordinal<Array<Scalar<Value>>>(4),
                    },
                },
                {
                    value: {
                        index: as.Ordinal<Array<Scalar<Value>>>(7),
                    },
                },
                {
                    value: {
                        index: as.Ordinal<Array<Scalar<Value>>>(8),
                    },
                },
            ]

            const notesValueIndexSum: number = computeNotesValueIndexSum(notes)

            expect(notesValueIndexSum)
                .toBe(19)
        })
    })
})
