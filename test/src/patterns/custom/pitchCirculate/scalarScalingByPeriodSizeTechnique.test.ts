// tslint:disable number-literal-format

import {
    as,
    computeEqualDivisionPitchScalars,
    Intensity,
    Pitch,
    Position,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate, Scale } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of scalar scaling by period size', (): void => {
    let outputSetOfNotes: Note[][]

    const A: Scalar<Intensity> = as.Scalar<Intensity>(0.011)
    const B: Scalar<Intensity> = as.Scalar<Intensity>(0.020)
    const C: Scalar<Intensity> = as.Scalar<Intensity>(0.034)
    const D: Scalar<Intensity> = as.Scalar<Intensity>(0.056)
    const E: Scalar<Intensity> = as.Scalar<Intensity>(0.089)
    const F: Scalar<Intensity> = as.Scalar<Intensity>(0.135)
    const G: Scalar<Intensity> = as.Scalar<Intensity>(0.198)
    const H: Scalar<Intensity> = as.Scalar<Intensity>(0.278)
    const I: Scalar<Intensity> = as.Scalar<Intensity>(0.375)
    const J: Scalar<Intensity> = as.Scalar<Intensity>(0.487)
    const K: Scalar<Intensity> = as.Scalar<Intensity>(0.607)
    const L: Scalar<Intensity> = as.Scalar<Intensity>(0.726)
    const M: Scalar<Intensity> = as.Scalar<Intensity>(0.835)
    const N: Scalar<Intensity> = as.Scalar<Intensity>(0.923)
    const O: Scalar<Intensity> = as.Scalar<Intensity>(0.980)
    const P: Scalar<Intensity> = as.Scalar<Intensity>(1.000)

    describe('given some notes, will return a set of version of those notes which together constitute the pitch circled version of it', (): void => {
        const originalIntensityScalar: Scalar<Intensity> = as.Scalar<Intensity>(0.5)
        beforeEach((): void => {
            const inputNotes: Note[] = [ {
                intensity: {
                    scalar: originalIntensityScalar,
                },
                pitch: {
                    scalar: as.Scalar<Pitch>(57),
                },
            } ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    periodSize: as.Scalar<Scalar<Pitch>>(2),
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_PERIOD_SIZE,
                },
            )
        })

        it('scales the pitches so that each set of notes is off from the next by the period size (and for now always returning three sets of notes, starting with the lowest possible set of notes)', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(57 / 32))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(57 / 16))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(57 / 8))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are', (): void => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar<Scalar<Intensity>> = as.Scalar<Scalar<Intensity>>(0.410)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar<Scalar<Intensity>> = as.Scalar<Scalar<Intensity>>(0.800)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar<Scalar<Intensity>> = as.Scalar<Scalar<Intensity>>(0.028)

            expect(outputSetOfNotes[ 0 ][ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalIntensityScalar, MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE))
            expect(outputSetOfNotes[ 1 ][ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalIntensityScalar, LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES))
            expect(outputSetOfNotes[ 2 ][ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalIntensityScalar, QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE))
        })
    })

    describe('preserving all the other information (besides pitch scalar and gain scalar)', (): void => {
        beforeEach((): void => {
            const inputNotes: Note[] = [
                {
                    envelope: {
                        index: as.Ordinal<Array<Scalar<Value>>>(6),
                        scalar: as.Scalar<Value>(7),
                        scaleIndex: as.Ordinal<Array<Scale<Value>>>(8),
                    },
                    intensity: {
                        index: as.Ordinal<Array<Scalar<Intensity>>>(9),
                        scaleIndex: as.Ordinal<Array<Scale<Intensity>>>(5),
                    },
                    pitch: {
                        index: as.Ordinal<Array<Scalar<Pitch>>>(11),
                        scaleIndex: as.Ordinal<Array<Scale<Pitch>>>(10),
                    },
                    position: [ {
                        index: as.Ordinal<Array<Scalar<Position>>>(2),
                        scalar: as.Scalar<Position>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Position>>>(6),
                    } ],
                    value: {
                        index: as.Ordinal<Array<Scalar<Value>>>(3),
                        scalar: as.Scalar<Value>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Value>>>(5),
                    },
                },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    periodSize: as.Scalar<Scalar<Pitch>>(2),
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_PERIOD_SIZE,
                },
            )
        })

        it('copies the duration into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].value)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(3),
                    scalar: as.Scalar<Value>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(5),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].value)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(3),
                    scalar: as.Scalar<Value>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(5),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].value)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(3),
                    scalar: as.Scalar<Value>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(5),
                })
        })

        it('copies the sustain into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].envelope)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(6),
                    scalar: as.Scalar<Value>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(8),
                })
            expect(outputSetOfNotes[ 1 ][ 0 ].envelope)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(6),
                    scalar: as.Scalar<Value>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(8),
                })
            expect(outputSetOfNotes[ 2 ][ 0 ].envelope)
                .toEqual({
                    index: as.Ordinal<Array<Scalar<Value>>>(6),
                    scalar: as.Scalar<Value>(7),
                    scaleIndex: as.Ordinal<Array<Scale<Value>>>(8),
                })
        })

        it('copies the position into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Position>>>(2),
                    scalar: as.Scalar<Position>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Position>>>(6),
                } ])
            expect(outputSetOfNotes[ 1 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Position>>>(2),
                    scalar: as.Scalar<Position>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Position>>>(6),
                } ])
            expect(outputSetOfNotes[ 2 ][ 0 ].position)
                .toEqual([ {
                    index: as.Ordinal<Array<Scalar<Position>>>(2),
                    scalar: as.Scalar<Position>(4),
                    scaleIndex: as.Ordinal<Array<Scale<Position>>>(6),
                } ])
        })

        it('copies the pitch scale index into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
        })

        it('copies the pitch index into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(11))
        })

        it('copies the gain scale index into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].intensity!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Intensity>>>(5))
            expect(outputSetOfNotes[ 1 ][ 0 ].intensity!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Intensity>>>(5))
            expect(outputSetOfNotes[ 2 ][ 0 ].intensity!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Intensity>>>(5))
        })

        it('copies the gain index into each set of notes', (): void => {
            expect(outputSetOfNotes[ 0 ][ 0 ].intensity!.index)
                .toEqual(as.Ordinal<Array<Scalar<Intensity>>>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].intensity!.index)
                .toEqual(as.Ordinal<Array<Scalar<Intensity>>>(9))
            expect(outputSetOfNotes[ 2 ][ 0 ].intensity!.index)
                .toEqual(as.Ordinal<Array<Scalar<Intensity>>>(9))
        })
    })

    describe('gain goes in a cycle', (): void => {
        beforeEach((): void => {
            const tenEdScalars: Array<Scalar<Pitch>> = computeEqualDivisionPitchScalars(as.Denominator(10))
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
                { pitch: { scalar: as.Scalar<Pitch>(2) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    periodSize: as.Scalar<Scalar<Pitch>>(2),
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_PERIOD_SIZE,
                },
            )
        })

        it('it should return the same result after one loop around the pitch classes', (): void => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].intensity!.scalar)
                .toEqual(lowNotes[ 10 ].intensity!.scalar)
            expect(middleNotes[ 0 ].intensity!.scalar)
                .toEqual(middleNotes[ 10 ].intensity!.scalar)
            expect(highNotes[ 0 ].intensity!.scalar)
                .toEqual(highNotes[ 10 ].intensity!.scalar)
        })

        it('the gain of the low notes at the end connects back up with the gain of the middle notes at the beginning, and the gain at the end of the middle notes connects back up with the gain of the high notes at the beginning', (): void => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(A)
            expect(lowNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(B)
            expect(lowNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(C)
            expect(lowNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(D)
            expect(lowNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(E)
            expect(lowNotes[ 5 ].intensity!.scalar!)
                .toBeCloseToTyped(F)
            expect(lowNotes[ 6 ].intensity!.scalar!)
                .toBeCloseToTyped(G)
            expect(lowNotes[ 7 ].intensity!.scalar!)
                .toBeCloseToTyped(H)
            expect(lowNotes[ 8 ].intensity!.scalar!)
                .toBeCloseToTyped(I)
            expect(lowNotes[ 9 ].intensity!.scalar!)
                .toBeCloseToTyped(J)

            expect(middleNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(K)
            expect(middleNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(L)
            expect(middleNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(N)
            expect(middleNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 5 ].intensity!.scalar!)
                .toBeCloseToTyped(P)
            expect(middleNotes[ 6 ].intensity!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 7 ].intensity!.scalar!)
                .toBeCloseToTyped(N)
            expect(middleNotes[ 8 ].intensity!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 9 ].intensity!.scalar!)
                .toBeCloseToTyped(L)

            expect(highNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(J)
            expect(highNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(H)
            expect(highNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 5 ].intensity!.scalar!)
                .toBeCloseToTyped(F)
            expect(highNotes[ 6 ].intensity!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 7 ].intensity!.scalar!)
                .toBeCloseToTyped(D)
            expect(highNotes[ 8 ].intensity!.scalar!)
                .toBeCloseToTyped(C)
            expect(highNotes[ 9 ].intensity!.scalar!)
                .toBeCloseToTyped(B)
        })
    })

    describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', (): void => {
        beforeEach((): void => {
            const fiveEdScalars: Array<Scalar<Pitch>> = computeEqualDivisionPitchScalars(as.Denominator(5))
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
                    periodSize: as.Scalar<Scalar<Pitch>>(2),
                    technique: PitchCircularTechnique.SCALAR_SCALING_BY_PERIOD_SIZE,
                },
            )
        })

        it('works', (): void => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(A)
            expect(lowNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(C)
            expect(lowNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(E)
            expect(lowNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(G)
            expect(lowNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(I)

            expect(middleNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(K)
            expect(middleNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(M)

            expect(highNotes[ 0 ].intensity!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 1 ].intensity!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 2 ].intensity!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 3 ].intensity!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 4 ].intensity!.scalar!)
                .toBeCloseToTyped(C)
        })
    })
})
