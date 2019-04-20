// tslint:disable number-literal-format

import { as, insteadOf, Scalar, use } from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate, Scale } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of index translation by pitch class count', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar<Scalar> = as.Scalar<Scalar>(0.011)
    const B: Scalar<Scalar> = as.Scalar<Scalar>(0.018)
    const C: Scalar<Scalar> = as.Scalar<Scalar>(0.029)
    const D: Scalar<Scalar> = as.Scalar<Scalar>(0.043)
    const E: Scalar<Scalar> = as.Scalar<Scalar>(0.066)
    const F: Scalar<Scalar> = as.Scalar<Scalar>(0.096)
    const G: Scalar<Scalar> = as.Scalar<Scalar>(0.135)
    const H: Scalar<Scalar> = as.Scalar<Scalar>(0.186)
    const I: Scalar<Scalar> = as.Scalar<Scalar>(0.249)
    const J: Scalar<Scalar> = as.Scalar<Scalar>(0.324)
    const K: Scalar<Scalar> = as.Scalar<Scalar>(0.411)
    const L: Scalar<Scalar> = as.Scalar<Scalar>(0.506)
    const M: Scalar<Scalar> = as.Scalar<Scalar>(0.606)
    const N: Scalar<Scalar> = as.Scalar<Scalar>(0.707)
    const O: Scalar<Scalar> = as.Scalar<Scalar>(0.801)
    const P: Scalar<Scalar> = as.Scalar<Scalar>(0.882)
    const Q: Scalar<Scalar> = as.Scalar<Scalar>(0.945)
    const R: Scalar<Scalar> = as.Scalar<Scalar>(0.986)
    const S: Scalar<Scalar> = as.Scalar<Scalar>(1.000)

    describe('given a set of notes, will return a set of sets of notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar<Scalar> = as.Scalar<Scalar>(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    index: as.Ordinal<Scalar>(45),
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
                .toEqual(as.Ordinal<Scalar>(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Scalar>(21))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(as.Ordinal<Scalar>(33))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are (treating each index as an equal step, irrespective to whether they give differently sized pitch changes)', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar<Scalar> = as.Scalar<Scalar>(0.324)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar<Scalar> = as.Scalar<Scalar>(0.882)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar<Scalar> = as.Scalar<Scalar>(0.043)

            expect(outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
            expect(outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
            expect(outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!)
                .toBeCloseToTyped(use.Scalar(QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, insteadOf<Scalar, Scalar<Scalar>>(originalGain)))
        })
    })

    describe('preserving all the other information (besides pitch index and gain scalar)', () => {
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
                        scalar: as.Scalar<Scalar>(11),
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
                    pitchClassCount: as.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
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

        it('copies the pitch scalar into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(as.Scalar<Scalar>(11))
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
            const inputNotes: Note[] = [
                { pitch: { index: as.Ordinal<Scalar>(0) } },
                { pitch: { index: as.Ordinal<Scalar>(1) } },
                { pitch: { index: as.Ordinal<Scalar>(2) } },
                { pitch: { index: as.Ordinal<Scalar>(3) } },
                { pitch: { index: as.Ordinal<Scalar>(4) } },
                { pitch: { index: as.Ordinal<Scalar>(5) } },
                { pitch: { index: as.Ordinal<Scalar>(6) } },
                { pitch: { index: as.Ordinal<Scalar>(7) } },
                { pitch: { index: as.Ordinal<Scalar>(8) } },
                { pitch: { index: as.Ordinal<Scalar>(9) } },
                { pitch: { index: as.Ordinal<Scalar>(10) } },
                { pitch: { index: as.Ordinal<Scalar>(11) } },
                { pitch: { index: as.Ordinal<Scalar>(12) } },
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
                { pitch: { index: as.Ordinal<Scalar>(0) } },
                { pitch: { index: as.Ordinal<Scalar>(1) } },
                { pitch: { index: as.Ordinal<Scalar>(2) } },
                { pitch: { index: as.Ordinal<Scalar>(3) } },
                { pitch: { index: as.Ordinal<Scalar>(4) } },
                { pitch: { index: as.Ordinal<Scalar>(5) } },
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
