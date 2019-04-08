// tslint:disable-next-line no-reference
/// <reference path="../../../../types/index.d.ts" />

// tslint:disable number-literal-format

import { apply, computeEqualDivisionScalars, Scalar, to } from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of scalar scaling by window size', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar = to.Scalar(0.011)
    const B: Scalar = to.Scalar(0.020)
    const C: Scalar = to.Scalar(0.034)
    const D: Scalar = to.Scalar(0.056)
    const E: Scalar = to.Scalar(0.089)
    const F: Scalar = to.Scalar(0.135)
    const G: Scalar = to.Scalar(0.198)
    const H: Scalar = to.Scalar(0.278)
    const I: Scalar = to.Scalar(0.375)
    const J: Scalar = to.Scalar(0.487)
    const K: Scalar = to.Scalar(0.607)
    const L: Scalar = to.Scalar(0.726)
    const M: Scalar = to.Scalar(0.835)
    const N: Scalar = to.Scalar(0.923)
    const O: Scalar = to.Scalar(0.980)
    const P: Scalar = to.Scalar(1.000)

    describe('given some notes, will return a set of version of those notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar = to.Scalar(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    scalar: to.Scalar(57),
                },
            } ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: to.Scalar(to.Frequency(2)),
                },
            )
        })

        it('scales the pitches so that each set of notes is off from the next by the window size (and for now always returning three sets of notes, starting with the lowest possible set of notes)', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(57 / 32))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(57 / 16))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(57 / 8))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar = to.Scalar(0.410)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar = to.Scalar(0.800)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar = to.Scalar(0.028)

            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(apply.Scalar(MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, originalGain))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(apply.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES, originalGain))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(apply.Scalar(QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, originalGain))
        })
    })

    describe('preserving all the other information (besides pitch scalar and gain scalar)', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                {
                    duration: {
                        index: to.Ordinal(3),
                        scalar: to.Scalar(4),
                        scaleIndex: to.Ordinal(5),
                    },
                    gain: {
                        index: to.Ordinal(9),
                        scaleIndex: to.Ordinal(5),
                    },
                    pitch: {
                        index: to.Ordinal(11),
                        scaleIndex: to.Ordinal(10),
                    },
                    position: [ {
                        index: to.Ordinal(2),
                        scalar: to.Scalar(4),
                        scaleIndex: to.Ordinal(6),
                    } ],
                    sustain: {
                        index: to.Ordinal(6),
                        scalar: to.Scalar(7),
                        scaleIndex: to.Ordinal(8),
                    },
                },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: to.Scalar(to.Frequency(2)),
                },
            )
        })

        it('copies the duration into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].duration)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].duration)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].duration)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
        })

        it('copies the sustain into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].sustain)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].sustain)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].sustain)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
        })

        it('copies the position into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].position)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
            expect(outputSetOfNotes[ 1 ][ 0 ].position)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
            expect(outputSetOfNotes[ 2 ][ 0 ].position)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
        })

        it('copies the pitch scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scaleIndex)
                .toEqual(to.Ordinal(10))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scaleIndex)
                .toEqual(to.Ordinal(10))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scaleIndex)
                .toEqual(to.Ordinal(10))
        })

        it('copies the pitch index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(11))
        })

        it('copies the gain scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scaleIndex)
                .toEqual(to.Ordinal(5))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scaleIndex)
                .toEqual(to.Ordinal(5))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scaleIndex)
                .toEqual(to.Ordinal(5))
        })

        it('copies the gain index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.index)
                .toEqual(to.Ordinal(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.index)
                .toEqual(to.Ordinal(9))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.index)
                .toEqual(to.Ordinal(9))
        })
    })

    describe('gain goes in a cycle', () => {
        beforeEach(() => {
            const tenEdScalars: Scalar[] = computeEqualDivisionScalars(to.Denominator(10))
            const inputNotes: Note[] = [
                { pitch: { scalar: tenEdScalars[ 0 ] } },
                { pitch: { scalar: tenEdScalars[ 1 ] } },
                { pitch: { scalar: tenEdScalars[ 2 ] } },
                { pitch: { scalar: tenEdScalars[ 3 ] } },
                { pitch: { scalar: tenEdScalars[ 4 ] } },
                { pitch: { scalar: tenEdScalars[ 5 ] } },
                { pitch: { scalar: tenEdScalars[ 6 ] } },
                { pitch: { scalar: tenEdScalars[ 7 ] } },
                { pitch: { scalar: tenEdScalars[ 8 ] } },
                { pitch: { scalar: tenEdScalars[ 9 ] } },
                { pitch: { scalar: to.Scalar(2) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: to.Scalar(to.Frequency(2)),
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
            const fiveEdScalars: Scalar[] = computeEqualDivisionScalars(to.Denominator(5))
            const inputNotes: Note[] = [
                { pitch: { scalar: fiveEdScalars[ 0 ] } },
                { pitch: { scalar: fiveEdScalars[ 1 ] } },
                { pitch: { scalar: fiveEdScalars[ 2 ] } },
                { pitch: { scalar: fiveEdScalars[ 3 ] } },
                { pitch: { scalar: fiveEdScalars[ 4 ] } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                    windowSize: to.Scalar(to.Frequency(2)),
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
