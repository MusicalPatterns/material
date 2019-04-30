import { as, Duration, musicalAs, Scalar, Value } from '@musical-patterns/utilities'
import { computeNotesDuration, Note, Scale } from '../../../../src/indexForTest'

describe('durations', () => {
    describe('of notes', () => {
        it('tells you how long a set of note are going to take to play once compiled', () => {
            const notes: Note[] = [
                {
                    value: {
                        scalar: as.Scalar<Value>(2),
                    },
                },
                {
                    value: {
                        index: as.Ordinal<Array<Scalar<Value>>>(1),
                    },
                },
            ]
            const scales: Scale[] = [
                { scalars: [ 5, 7 ].map(as.Scalar) },
            ]

            const actual: Duration = computeNotesDuration(notes, scales)

            expect(actual)
                .toBe(musicalAs.Duration(17))
        })
    })
})
