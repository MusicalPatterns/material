// tslint:disable number-literal-format

import { as, computeEqualDivisionScalars, Frequency, Hz, insteadOf, Scalar, use } from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate, Scale } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of scalar scaling by window size', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar<Scalar> = as.Scalar<Scalar>(0.011)
    const B: Scalar<Scalar> = as.Scalar<Scalar>(0.020)
    const C: Scalar<Scalar> = as.Scalar<Scalar>(0.034)
    const D: Scalar<Scalar> = as.Scalar<Scalar>(0.056)
    const E: Scalar<Scalar> = as.Scalar<Scalar>(0.089)
    const F: Scalar<Scalar> = as.Scalar<Scalar>(0.135)
    const G: Scalar<Scalar> = as.Scalar<Scalar>(0.198)
    const H: Scalar<Scalar> = as.Scalar<Scalar>(0.278)
    const I: Scalar<Scalar> = as.Scalar<Scalar>(0.375)
    const J: Scalar<Scalar> = as.Scalar<Scalar>(0.487)
    const K: Scalar<Scalar> = as.Scalar<Scalar>(0.607)
    const L: Scalar<Scalar> = as.Scalar<Scalar>(0.726)
    const M: Scalar<Scalar> = as.Scalar<Scalar>(0.835)
    const N: Scalar<Scalar> = as.Scalar<Scalar>(0.923)
    const O: Scalar<Scalar> = as.Scalar<Scalar>(0.980)
    const P: Scalar<Scalar> = as.Scalar<Scalar>(1.000)

    describe('given some notes, will return a set of version of those notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar<Scalar> = as.Scalar<Scalar>(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    scalar: as.Scalar<Scalar>(57),
                },
            } ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: as.Scalar<Scalar<Frequency>>(2),
                },
            )
        })

        it('scales the pitches so that each set of notes is off from the next by the window size (and for now always returning three sets of notes, starting with the lowest possible set of notes)', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(57 / 32))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(57 / 16))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(57 / 8))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar<Scalar> = as.Scalar<Scalar>(0.410)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar<Scalar> = as.Scalar<Scalar>(0.800)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar<Scalar> = as.Scalar<Scalar>(0.028)

            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
        })
    })

    describe('preserving all the other information (besides pitch scalar and gain scalar)', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                {
                    duration: {
                        index: as.Ordinal<Scalar>(3),
                        scalar: as.Scalar<Scalar>(4),
                        scaleIndex: as.Ordinal<Scale>(5),
                    },
                    gain: {
                        index: as.Ordinal<Scalar>(9),
                        scaleIndex: as.Ordinal<Scale>(5),
                    },
                    pitch: {
                        index: as.Ordinal<Scalar>(11),
                        scaleIndex: as.Ordinal<Scale>(10),
                    },
                    position: [ {
                        index: as.Ordinal<Scalar>(2),
                        scalar: as.Scalar<Scalar>(4),
                        scaleIndex: as.Ordinal<Scale>(6),
                    } ],
                    sustain: {
                        index: as.Ordinal<Scalar>(6),
                        scalar: as.Scalar<Scalar>(7),
                        scaleIndex: as.Ordinal<Scale>(8),
                    },
                },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: as.Scalar<Scalar<Frequency>>(2),
                },
            )
        })

        it('copies the duration into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].duration)
                .toEqual({
                    index: as.Ordinal<Scalar>(3),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(5),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].duration)
                .toEqual({
                    index: as.Ordinal<Scalar>(3),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(5),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].duration)
                .toEqual({
                    index: as.Ordinal<Scalar>(3),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(5),
                })
        })

        it('copies the sustain into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Scalar>(6),
                    scalar: as.Scalar<Scalar>(7),
                    scaleIndex: as.Ordinal<Scale>(8),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Scalar>(6),
                    scalar: as.Scalar<Scalar>(7),
                    scaleIndex: as.Ordinal<Scale>(8),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Scalar>(6),
                    scalar: as.Scalar<Scalar>(7),
                    scaleIndex: as.Ordinal<Scale>(8),
                })
        })

        it('copies the position into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Scalar>(2),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(6),
                } ])
            expect(outputSetOfNotes[ 1 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Scalar>(2),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(6),
                } ])
            expect(outputSetOfNotes[ 2 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Scalar>(2),
                    scalar: as.Scalar<Scalar>(4),
                    scaleIndex: as.Ordinal<Scale>(6),
                } ])
        })

        it('copies the pitch scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(10))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(10))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(10))
        })

        it('copies the pitch index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Scalar>(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Scalar>(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Scalar>(11))
        })

        it('copies the gain scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(5))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(5))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Scale>(5))
        })

        it('copies the gain index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Scalar>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Scalar>(9))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Scalar>(9))
        })
    })

    describe('gain goes in a cycle', () => {
        beforeEach(() => {
            const tenEdScalars: Array<Scalar<Hz>> = computeEqualDivisionScalars(as.Denominator(10))
            const inputNotes: Note[] = [
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 0 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 1 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 2 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 3 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 4 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 5 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 6 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 7 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 8 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(tenEdScalars[ 9 ]) } },
                { pitch: { scalar: as.Scalar<Scalar>(2) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: as.Scalar<Scalar<Frequency>>(2),
                },
            )
        })

        it('it should return the same result after one loop around the pitch classes', () => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].gain!.scalar)
                .toEqual(lowNotes[ 10 ].gain!.scalar)
            expect(middleNotes[ 0 ].gain!.scalar)
                .toEqual(middleNotes[ 10 ].gain!.scalar)
            expect(highNotes[ 0 ].gain!.scalar)
                .toEqual(highNotes[ 10 ].gain!.scalar)
        })

        it('the gain of the low notes at the end connects back up with the gain of the middle notes at the beginning, and the gain at the end of the middle notes connects back up with the gain of the high notes at the beginning', () => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(A)
            expect(lowNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(B)
            expect(lowNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(C)
            expect(lowNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(D)
            expect(lowNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(lowNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(F)
            expect(lowNotes[ 6 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(lowNotes[ 7 ].gain!.scalar!)
                .toBeCloseToTyped(H)
            expect(lowNotes[ 8 ].gain!.scalar!)
                .toBeCloseToTyped(I)
            expect(lowNotes[ 9 ].gain!.scalar!)
                .toBeCloseToTyped(J)

            expect(middleNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(middleNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(L)
            expect(middleNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(N)
            expect(middleNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(P)
            expect(middleNotes[ 6 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 7 ].gain!.scalar!)
                .toBeCloseToTyped(N)
            expect(middleNotes[ 8 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 9 ].gain!.scalar!)
                .toBeCloseToTyped(L)

            expect(highNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(J)
            expect(highNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(H)
            expect(highNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(F)
            expect(highNotes[ 6 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 7 ].gain!.scalar!)
                .toBeCloseToTyped(D)
            expect(highNotes[ 8 ].gain!.scalar!)
                .toBeCloseToTyped(C)
            expect(highNotes[ 9 ].gain!.scalar!)
                .toBeCloseToTyped(B)
        })
    })

    describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', () => {
        beforeEach(() => {
            const fiveEdScalars: Array<Scalar<Hz>> = computeEqualDivisionScalars(as.Denominator(5))
            const inputNotes: Note[] = [
                { pitch: { scalar: insteadOf<Scalar, Scalar>(fiveEdScalars[ 0 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(fiveEdScalars[ 1 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(fiveEdScalars[ 2 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(fiveEdScalars[ 3 ]) } },
                { pitch: { scalar: insteadOf<Scalar, Scalar>(fiveEdScalars[ 4 ]) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: as.Scalar<Scalar<Frequency>>(2),
                },
            )
        })

        it('works', () => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(A)
            expect(lowNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(C)
            expect(lowNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(lowNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(lowNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(I)

            expect(middleNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(middleNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(M)

            expect(highNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(C)
        })
    })
})
