import { to } from '@musical-patterns/utilities'
import { computeNotesTotalDurationByIndex, computeNotesTotalDurationByScalar, Note } from '../../../src/indexForTest'

describe('notes utilities', () => {
    describe('notes total duration by scalar', () => {
        it(`sums the scalars of each note's duration`, () => {
            const notes: Note[] = [
                {
                    duration: {
                        scalar: to.Scalar(4),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(7),
                    },
                },
                {
                    duration: {
                        scalar: to.Scalar(8),
                    },
                },
            ]

            const actualNotesTotalDurationByScalar: number = computeNotesTotalDurationByScalar(notes)

            expect(actualNotesTotalDurationByScalar)
                .toBe(19)
        })
    })

    describe('notes total duration by scalar', () => {
        it(`sums the scalars of each note's duration`, () => {
            const notes: Note[] = [
                {
                    duration: {
                        index: to.Index(4),
                    },
                },
                {
                    duration: {
                        index: to.Index(7),
                    },
                },
                {
                    duration: {
                        index: to.Index(8),
                    },
                },
            ]

            const actualNotesTotalDurationByIndex: number = computeNotesTotalDurationByIndex(notes)

            expect(actualNotesTotalDurationByIndex)
                .toBe(19)
        })
    })
})
