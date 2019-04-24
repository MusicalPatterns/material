import { as, Duration, Scalar } from '@musical-patterns/utilities'
import { computeNotesTotalDurationByIndex, computeNotesTotalDurationByScalar, Note } from '../../../src/indexForTest'

describe('notes utilities', () => {
    describe('notes total duration by scalar', () => {
        it(`sums the scalars of each note's duration`, () => {
            const notes: Note[] = [
                {
                    duration: {
                        scalar: as.Scalar<Duration>(4),
                    },
                },
                {
                    duration: {
                        scalar: as.Scalar<Duration>(7),
                    },
                },
                {
                    duration: {
                        scalar: as.Scalar<Duration>(8),
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
                        index: as.Ordinal<Array<Scalar<Duration>>>(4),
                    },
                },
                {
                    duration: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(7),
                    },
                },
                {
                    duration: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(8),
                    },
                },
            ]

            const actualNotesTotalDurationByIndex: number = computeNotesTotalDurationByIndex(notes)

            expect(actualNotesTotalDurationByIndex)
                .toBe(19)
        })
    })
})
