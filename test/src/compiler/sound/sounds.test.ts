import { as, Duration, musicalAs, Position } from '@musical-patterns/utilities'
import { compileSound, Note, Sound } from '../../../../src/indexForTest'

describe('compile sound', () => {
    describe('defaults', () => {
        let sound: Sound
        beforeEach(() => {
            const note: Note = {}
            sound = compileSound(note)
        })

        it('duration to 1', () => {
            expect(sound.duration)
                .toBe(musicalAs.Duration(1))
        })

        it('gain to 1', () => {
            expect(sound.gain)
                .toBe(as.Gain(1))
        })

        it('frequency to 1', () => {
            expect(sound.frequency)
                .toBe(musicalAs.Pitch(1))
        })

        it('position to the origin', () => {
            expect(sound.position)
                .toEqual([ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)))
        })

        it('sustain to 0.9', () => {
            expect(sound.sustain)
                .toBe(musicalAs.Duration(0.9))
        })
    })

    describe('adding dimensions to the position until it is 3D', () => {
        it('works when using a non-array position', () => {
            const note: Note = {
                position: {
                    scalar: as.Scalar<Position>(3),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)))
        })

        it('works for a single element position', () => {
            const note: Note = {
                position: [
                    {
                        scalar: as.Scalar<Position>(3),
                    },
                ],
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)))
        })

        it('works for a two element position', () => {
            const note: Note = {
                position: [
                    {
                        scalar: as.Scalar<Position>(3),
                    },
                    {
                        scalar: as.Scalar<Position>(2),
                    },
                ],
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 2, 0 ].map((dimension: number) => musicalAs.Position(dimension)))
        })
    })

    describe('sustain', () => {
        it('caps sustain at slightly less than the duration', () => {
            const note: Note = {
                duration: {
                    scalar: as.Scalar<Duration>(3),
                },
                sustain: {
                    scalar: as.Scalar<Duration>(8),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(musicalAs.Duration(3))
            expect(sound.sustain)
                .toEqual(musicalAs.Duration(2.9))
        })

        it('defaults sustain to slightly less than the duration', () => {
            const note: Note = {
                duration: {
                    scalar: as.Scalar<Duration>(3),
                },
            }

            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(musicalAs.Duration(3))
            expect(sound.sustain)
                .toEqual(musicalAs.Duration(2.9))
        })

        it('uses sustain if given and less than duration', () => {
            const note: Note = {
                duration: {
                    scalar: as.Scalar<Duration>(3),
                },
                sustain: {
                    scalar: as.Scalar<Duration>(2),
                },
            }

            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(musicalAs.Duration(3))
            expect(sound.sustain)
                .toEqual(musicalAs.Duration(2))
        })
    })
})
