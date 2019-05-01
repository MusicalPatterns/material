import { as, Duration, musicalAs, Scalar, Value } from '@musical-patterns/utilities'
import { AbstractName, computeNotesDuration, Note, Scales } from '../../../../src/indexForTest'

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
            const scales: Scales = {
                [ AbstractName.VALUE ]: [
                    { scalars: [ 5, 7 ].map((numeral: number) => as.Scalar<Value>(numeral)) },
                ],
            }

            const actual: Duration = computeNotesDuration(notes, scales)

            expect(actual)
                .toBe(musicalAs.Duration(17))
        })
    })
})
