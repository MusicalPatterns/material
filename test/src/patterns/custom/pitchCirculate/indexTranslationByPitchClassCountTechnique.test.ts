// tslint:disable number-literal-format

import { as, Duration, Gain, Pitch, Position, Scalar, use } from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate, Scale } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of index translation by pitch class count', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar<Gain> = as.Scalar<Gain>(0.011)
    const B: Scalar<Gain> = as.Scalar<Gain>(0.018)
    const C: Scalar<Gain> = as.Scalar<Gain>(0.029)
    const D: Scalar<Gain> = as.Scalar<Gain>(0.043)
    const E: Scalar<Gain> = as.Scalar<Gain>(0.066)
    const F: Scalar<Gain> = as.Scalar<Gain>(0.096)
    const G: Scalar<Gain> = as.Scalar<Gain>(0.135)
    const H: Scalar<Gain> = as.Scalar<Gain>(0.186)
    const I: Scalar<Gain> = as.Scalar<Gain>(0.249)
    const J: Scalar<Gain> = as.Scalar<Gain>(0.324)
    const K: Scalar<Gain> = as.Scalar<Gain>(0.411)
    const L: Scalar<Gain> = as.Scalar<Gain>(0.506)
    const M: Scalar<Gain> = as.Scalar<Gain>(0.606)
    const N: Scalar<Gain> = as.Scalar<Gain>(0.707)
    const O: Scalar<Gain> = as.Scalar<Gain>(0.801)
    const P: Scalar<Gain> = as.Scalar<Gain>(0.882)
    const Q: Scalar<Gain> = as.Scalar<Gain>(0.945)
    const R: Scalar<Gain> = as.Scalar<Gain>(0.986)
    const S: Scalar<Gain> = as.Scalar<Gain>(1.000)

    describe('given a set of notes, will return a set of sets of notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar<Gain> = as.Scalar<Gain>(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    index: as.Ordinal<Array<Scalar<Pitch>>>(45),
                },
            } ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: as.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('translates the pitch indices so that each set of notes is separated from the next by the pitch class count (and for now always returning three sets of notes, starting with the lowest possible set of notes)', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(21))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Array<Scalar<Pitch>>>(33))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are (treating each index as an equal step, irrespective to whether they give differently sized pitch changes)', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar<Scalar<Gain>> = as.Scalar<Scalar<Gain>>(0.324)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar<Scalar<Gain>> = as.Scalar<Scalar<Gain>>(0.882)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar<Scalar<Gain>> = as.Scalar<Scalar<Gain>>(0.043)

            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(originalGain, QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE))
        })
    })

    describe('preserving all the other information (besides pitch index and gain scalar)', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                {
                    duration: {
                        index: as.Ordinal<Array<Scalar<Duration>>>(3),
                        scalar: as.Scalar<Duration>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Duration>>>(5),
                    },
                    gain: {
                        index: as.Ordinal<Array<Scalar<Gain>>>(9),
                        scaleIndex: as.Ordinal<Array<Scale<Gain>>>(5),
                    },
                    pitch: {
                        scalar: as.Scalar<Pitch>(11),
                        scaleIndex: as.Ordinal<Array<Scale<Pitch>>>(10),
                    },
                    position: [ {
                        index: as.Ordinal<Array<Scalar<Position>>>(2),
                        scalar: as.Scalar<Position>(4),
                        scaleIndex: as.Ordinal<Array<Scale<Position>>>(6),
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
                    pitchClassCount: as.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
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

        it('copies the pitch scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Pitch>>>(10))
        })

        it('copies the pitch scalar into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Pitch>(11))
        })

        it('copies the gain scale index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Gain>>>(5))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Gain>>>(5))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scaleIndex)
                .toEqual(as.Ordinal<Array<Scale<Gain>>>(5))
        })

        it('copies the gain index into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Gain>>>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Gain>>>(9))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.index)
                .toEqual(as.Ordinal<Array<Scalar<Gain>>>(9))
        })
    })

    describe('gain goes in a cycle', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(0) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(1) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(2) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(3) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(4) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(5) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(6) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(7) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(8) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(9) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(10) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(11) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(12) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: as.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('it should return the same result after one loop around the pitch classes', () => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            expect(lowNotes[ 0 ].gain!.scalar)
                .toEqual(lowNotes[ 12 ].gain!.scalar)
            expect(middleNotes[ 0 ].gain!.scalar)
                .toEqual(middleNotes[ 12 ].gain!.scalar)
            expect(highNotes[ 0 ].gain!.scalar)
                .toEqual(highNotes[ 12 ].gain!.scalar)
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
            expect(lowNotes[ 10 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(lowNotes[ 11 ].gain!.scalar!)
                .toBeCloseToTyped(L)

            expect(middleNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(N)
            expect(middleNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(P)
            expect(middleNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(Q)
            expect(middleNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(R)
            expect(middleNotes[ 6 ].gain!.scalar!)
                .toBeCloseToTyped(S)
            expect(middleNotes[ 7 ].gain!.scalar!)
                .toBeCloseToTyped(R)
            expect(middleNotes[ 8 ].gain!.scalar!)
                .toBeCloseToTyped(Q)
            expect(middleNotes[ 9 ].gain!.scalar!)
                .toBeCloseToTyped(P)
            expect(middleNotes[ 10 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 11 ].gain!.scalar!)
                .toBeCloseToTyped(N)

            expect(highNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(highNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(L)
            expect(highNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(J)
            expect(highNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(H)
            expect(highNotes[ 6 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 7 ].gain!.scalar!)
                .toBeCloseToTyped(F)
            expect(highNotes[ 8 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 9 ].gain!.scalar!)
                .toBeCloseToTyped(D)
            expect(highNotes[ 10 ].gain!.scalar!)
                .toBeCloseToTyped(C)
            expect(highNotes[ 11 ].gain!.scalar!)
                .toBeCloseToTyped(B)
        })
    })

    describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(0) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(1) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(2) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(3) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(4) } },
                { pitch: { index: as.Ordinal<Array<Scalar<Pitch>>>(5) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: as.Cardinal(6),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
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
            expect(lowNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(K)

            expect(middleNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(middleNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(O)
            expect(middleNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(Q)
            expect(middleNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(S)
            expect(middleNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(Q)
            expect(middleNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(O)

            expect(highNotes[ 0 ].gain!.scalar!)
                .toBeCloseToTyped(M)
            expect(highNotes[ 1 ].gain!.scalar!)
                .toBeCloseToTyped(K)
            expect(highNotes[ 2 ].gain!.scalar!)
                .toBeCloseToTyped(I)
            expect(highNotes[ 3 ].gain!.scalar!)
                .toBeCloseToTyped(G)
            expect(highNotes[ 4 ].gain!.scalar!)
                .toBeCloseToTyped(E)
            expect(highNotes[ 5 ].gain!.scalar!)
                .toBeCloseToTyped(C)
        })
    })
})
