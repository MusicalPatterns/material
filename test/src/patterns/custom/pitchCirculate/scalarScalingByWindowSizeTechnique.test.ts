// tslint:disable number-literal-format

import {
    Amplitude,
    as,
    computeEqualDivisionPitches,
    Duration,
    Frequency,
    Meters,
    ofNotAs,
    Pitch,
    Point,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate, Scale } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of scalar scaling by window size', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar<Amplitude> = as.Scalar<Amplitude>(0.011)
    const B: Scalar<Amplitude> = as.Scalar<Amplitude>(0.020)
    const C: Scalar<Amplitude> = as.Scalar<Amplitude>(0.034)
    const D: Scalar<Amplitude> = as.Scalar<Amplitude>(0.056)
    const E: Scalar<Amplitude> = as.Scalar<Amplitude>(0.089)
    const F: Scalar<Amplitude> = as.Scalar<Amplitude>(0.135)
    const G: Scalar<Amplitude> = as.Scalar<Amplitude>(0.198)
    const H: Scalar<Amplitude> = as.Scalar<Amplitude>(0.278)
    const I: Scalar<Amplitude> = as.Scalar<Amplitude>(0.375)
    const J: Scalar<Amplitude> = as.Scalar<Amplitude>(0.487)
    const K: Scalar<Amplitude> = as.Scalar<Amplitude>(0.607)
    const L: Scalar<Amplitude> = as.Scalar<Amplitude>(0.726)
    const M: Scalar<Amplitude> = as.Scalar<Amplitude>(0.835)
    const N: Scalar<Amplitude> = as.Scalar<Amplitude>(0.923)
    const O: Scalar<Amplitude> = as.Scalar<Amplitude>(0.980)
    const P: Scalar<Amplitude> = as.Scalar<Amplitude>(1.000)

    describe('given some notes, will return a set of version of those notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar<Amplitude> = as.Scalar<Amplitude>(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    scalar: as.Scalar<Pitch>(57),
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
                .toEqual(as.Scalar<Pitch>(57 / 32))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(57 / 16))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(57 / 8))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar<Scalar<Amplitude>> = as.Scalar<Scalar<Amplitude>>(0.410)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar<Scalar<Amplitude>> = as.Scalar<Scalar<Amplitude>>(0.800)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar<Scalar<Amplitude>> = as.Scalar<Scalar<Amplitude>>(0.028)

            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE))
        })
    })

    describe('preserving all the other information (besides pitch scalar and gain scalar)', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                {
                    duration: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(3),
                        scalar: as.Scalar<Duration>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Duration>>>(5),
                    },
                    gain: {
                        index: as.Ordinal<Array<Scalar<Amplitude>>>(9),
                        scaleIndex: as.Ordinal<Array<Scale<Amplitude>>>(5),
                    },
                    pitch: {
                        index: as.Ordinal<Array<Scalar<Pitch>>>(11),
                        scaleIndex: as.Ordinal<Array<Scale<Pitch>>>(10),
                    },
                    position: [ {
                        index: as.Ordinal<Array<Scalar<Point<Meters>>>>(2),
                        scalar: as.Scalar<Point<Meters>>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Point<Meters>>>>(6),
                    } ],
                    sustain: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(6),
                        scalar: as.Scalar<Duration>(7),
                        scaleIndex: as.Ordinal<Array<Scale<Duration>>>(8),
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
                    index: as.Ordinal<Array<Scalar<Duration>>>(3),
                    scalar: as.Scalar<Duration>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(5),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].duration)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Duration>>>(3),
                    scalar: as.Scalar<Duration>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(5),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].duration)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Duration>>>(3),
                    scalar: as.Scalar<Duration>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(5),
                })
        })

        it('copies the sustain into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Duration>>>(6),
                    scalar: as.Scalar<Duration>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(8),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Duration>>>(6),
                    scalar: as.Scalar<Duration>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(8),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].sustain)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Duration>>>(6),
                    scalar: as.Scalar<Duration>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Duration>>>(8),
                })
        })

        it('copies the position into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Point<Meters>>>>(2),
                    scalar: as.Scalar<Point<Meters>>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Point<Meters>>>>(6),
                } ])
            expect(outputSetOfNotes[ 1 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Point<Meters>>>>(2),
                    scalar: as.Scalar<Point<Meters>>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Point<Meters>>>>(6),
                } ])
            expect(outputSetOfNotes[ 2 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Point<Meters>>>>(2),
                    scalar: as.Scalar<Point<Meters>>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Point<Meters>>>>(6),
                } ])
        })

        it('copies the pitch scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
        })

        it('copies the pitch index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
        })

        it('copies the gain scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Amplitude>>>(5))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Amplitude>>>(5))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Amplitude>>>(5))
        })

        it('copies the gain index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Amplitude>>>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Amplitude>>>(9))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Amplitude>>>(9))
        })
    })

    describe('gain goes in a cycle', () => {
        beforeEach(() => {
            const tenEdScalars: Pitch[] = computeEqualDivisionPitches(as.Denominator(10))
            const inputNotes: Note[] = [
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 0 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 1 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 2 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 3 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 4 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 5 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 6 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 7 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 8 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(tenEdScalars[ 9 ])) } },
                { pitch: { scalar: as.Scalar<Pitch>(2) } },
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
            const fiveEdScalars: Pitch[] = computeEqualDivisionPitches(as.Denominator(5))
            const inputNotes: Note[] = [
                { pitch: { scalar: as.Scalar(ofNotAs(fiveEdScalars[ 0 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(fiveEdScalars[ 1 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(fiveEdScalars[ 2 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(fiveEdScalars[ 3 ])) } },
                { pitch: { scalar: as.Scalar(ofNotAs(fiveEdScalars[ 4 ])) } },
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
