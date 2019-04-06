// tslint:disable number-literal-format

import { apply, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { Note, PitchCircularTechnique, pitchCirculate } from '../../../../../src/indexForTest'

describe('pitch circulate, using the technique of index translation by pitch class count', () => {
    let outputSetOfNotes: Note[][]

    const A: Scalar = to.Scalar(0.011)
    const B: Scalar = to.Scalar(0.018)
    const C: Scalar = to.Scalar(0.029)
    const D: Scalar = to.Scalar(0.043)
    const E: Scalar = to.Scalar(0.066)
    const F: Scalar = to.Scalar(0.096)
    const G: Scalar = to.Scalar(0.135)
    const H: Scalar = to.Scalar(0.186)
    const I: Scalar = to.Scalar(0.249)
    const J: Scalar = to.Scalar(0.324)
    const K: Scalar = to.Scalar(0.411)
    const L: Scalar = to.Scalar(0.506)
    const M: Scalar = to.Scalar(0.606)
    const N: Scalar = to.Scalar(0.707)
    const O: Scalar = to.Scalar(0.801)
    const P: Scalar = to.Scalar(0.882)
    const Q: Scalar = to.Scalar(0.945)
    const R: Scalar = to.Scalar(0.986)
    const S: Scalar = to.Scalar(1.000)

    describe('given a set of notes, will return a set of sets of notes which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar = to.Scalar(0.5)
        beforeEach(() => {
            const inputNotes: Note[] = [ {
                gain: {
                    scalar: originalGain,
                },
                pitch: {
                    index: to.Ordinal(45),
                },
            } ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: to.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('translates the pitch indices so that each set of notes is separated from the next by the pitch class count (and for now always returning three sets of notes, starting with the lowest possible set of notes)', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(9))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(21))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.index)
                .toEqual(to.Ordinal(33))
        })

        it('maps the gain to a normal distribution curve, so that the center set of notes is loud, and the outer sets of notes get quieter depending on how far from the center they are (treating each index as an equal step, irrespective to whether they give differently sized pitch changes)', () => {
            const MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar = to.Scalar(0.324)
            const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES: Scalar = to.Scalar(0.882)
            const QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar = to.Scalar(0.043)

            testIsCloseTo(
                outputSetOfNotes[ 0 ][ 0 ].gain!.scalar!,
                apply.Scalar(MEDIUM_LOUD_IN_THE_LOW_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, originalGain),
            )
            testIsCloseTo(
                outputSetOfNotes[ 1 ][ 0 ].gain!.scalar!,
                apply.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_NOTES, originalGain),
            )
            testIsCloseTo(
                outputSetOfNotes[ 2 ][ 0 ].gain!.scalar!,
                apply.Scalar(QUIETEST_IN_THE_HIGH_NOTES_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, originalGain),
            )
        })
    })

    describe('preserving all the other information (besides pitch index and gain scalar)', () => {
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
                        scalar: to.Scalar(11),
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
                    pitchClassCount: to.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
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

        it('copies the pitch scalar into each set of notes', () => {
            expect(outputSetOfNotes[ 0 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(11))
            expect(outputSetOfNotes[ 1 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(11))
            expect(outputSetOfNotes[ 2 ][ 0 ].pitch!.scalar)
                .toEqual(to.Scalar(11))
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
            const inputNotes: Note[] = [
                { pitch: { index: to.Ordinal(0) } },
                { pitch: { index: to.Ordinal(1) } },
                { pitch: { index: to.Ordinal(2) } },
                { pitch: { index: to.Ordinal(3) } },
                { pitch: { index: to.Ordinal(4) } },
                { pitch: { index: to.Ordinal(5) } },
                { pitch: { index: to.Ordinal(6) } },
                { pitch: { index: to.Ordinal(7) } },
                { pitch: { index: to.Ordinal(8) } },
                { pitch: { index: to.Ordinal(9) } },
                { pitch: { index: to.Ordinal(10) } },
                { pitch: { index: to.Ordinal(11) } },
                { pitch: { index: to.Ordinal(12) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: to.Cardinal(12),
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

            testIsCloseTo(lowNotes[ 0 ].gain!.scalar!, A)
            testIsCloseTo(lowNotes[ 1 ].gain!.scalar!, B)
            testIsCloseTo(lowNotes[ 2 ].gain!.scalar!, C)
            testIsCloseTo(lowNotes[ 3 ].gain!.scalar!, D)
            testIsCloseTo(lowNotes[ 4 ].gain!.scalar!, E)
            testIsCloseTo(lowNotes[ 5 ].gain!.scalar!, F)
            testIsCloseTo(lowNotes[ 6 ].gain!.scalar!, G)
            testIsCloseTo(lowNotes[ 7 ].gain!.scalar!, H)
            testIsCloseTo(lowNotes[ 8 ].gain!.scalar!, I)
            testIsCloseTo(lowNotes[ 9 ].gain!.scalar!, J)
            testIsCloseTo(lowNotes[ 10 ].gain!.scalar!, K)
            testIsCloseTo(lowNotes[ 11 ].gain!.scalar!, L)

            testIsCloseTo(middleNotes[ 0 ].gain!.scalar!, M)
            testIsCloseTo(middleNotes[ 1 ].gain!.scalar!, N)
            testIsCloseTo(middleNotes[ 2 ].gain!.scalar!, O)
            testIsCloseTo(middleNotes[ 3 ].gain!.scalar!, P)
            testIsCloseTo(middleNotes[ 4 ].gain!.scalar!, Q)
            testIsCloseTo(middleNotes[ 5 ].gain!.scalar!, R)
            testIsCloseTo(middleNotes[ 6 ].gain!.scalar!, S)
            testIsCloseTo(middleNotes[ 7 ].gain!.scalar!, R)
            testIsCloseTo(middleNotes[ 8 ].gain!.scalar!, Q)
            testIsCloseTo(middleNotes[ 9 ].gain!.scalar!, P)
            testIsCloseTo(middleNotes[ 10 ].gain!.scalar!, O)
            testIsCloseTo(middleNotes[ 11 ].gain!.scalar!, N)

            testIsCloseTo(highNotes[ 0 ].gain!.scalar!, M)
            testIsCloseTo(highNotes[ 1 ].gain!.scalar!, L)
            testIsCloseTo(highNotes[ 2 ].gain!.scalar!, K)
            testIsCloseTo(highNotes[ 3 ].gain!.scalar!, J)
            testIsCloseTo(highNotes[ 4 ].gain!.scalar!, I)
            testIsCloseTo(highNotes[ 5 ].gain!.scalar!, H)
            testIsCloseTo(highNotes[ 6 ].gain!.scalar!, G)
            testIsCloseTo(highNotes[ 7 ].gain!.scalar!, F)
            testIsCloseTo(highNotes[ 8 ].gain!.scalar!, E)
            testIsCloseTo(highNotes[ 9 ].gain!.scalar!, D)
            testIsCloseTo(highNotes[ 10 ].gain!.scalar!, C)
            testIsCloseTo(highNotes[ 11 ].gain!.scalar!, B)
        })
    })

    describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', () => {
        beforeEach(() => {
            const inputNotes: Note[] = [
                { pitch: { index: to.Ordinal(0) } },
                { pitch: { index: to.Ordinal(1) } },
                { pitch: { index: to.Ordinal(2) } },
                { pitch: { index: to.Ordinal(3) } },
                { pitch: { index: to.Ordinal(4) } },
                { pitch: { index: to.Ordinal(5) } },
            ]

            outputSetOfNotes = pitchCirculate(
                inputNotes,
                {
                    pitchClassCount: to.Cardinal(6),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('works', () => {
            const [ lowNotes, middleNotes, highNotes ] = outputSetOfNotes

            testIsCloseTo(lowNotes[ 0 ].gain!.scalar!, A)
            testIsCloseTo(lowNotes[ 1 ].gain!.scalar!, C)
            testIsCloseTo(lowNotes[ 2 ].gain!.scalar!, E)
            testIsCloseTo(lowNotes[ 3 ].gain!.scalar!, G)
            testIsCloseTo(lowNotes[ 4 ].gain!.scalar!, I)
            testIsCloseTo(lowNotes[ 5 ].gain!.scalar!, K)

            testIsCloseTo(middleNotes[ 0 ].gain!.scalar!, M)
            testIsCloseTo(middleNotes[ 1 ].gain!.scalar!, O)
            testIsCloseTo(middleNotes[ 2 ].gain!.scalar!, Q)
            testIsCloseTo(middleNotes[ 3 ].gain!.scalar!, S)
            testIsCloseTo(middleNotes[ 4 ].gain!.scalar!, Q)
            testIsCloseTo(middleNotes[ 5 ].gain!.scalar!, O)

            testIsCloseTo(highNotes[ 0 ].gain!.scalar!, M)
            testIsCloseTo(highNotes[ 1 ].gain!.scalar!, K)
            testIsCloseTo(highNotes[ 2 ].gain!.scalar!, I)
            testIsCloseTo(highNotes[ 3 ].gain!.scalar!, G)
            testIsCloseTo(highNotes[ 4 ].gain!.scalar!, E)
            testIsCloseTo(highNotes[ 5 ].gain!.scalar!, C)
        })
    })
})
