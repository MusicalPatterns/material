import { as, Location, musicalAs, Position, Value } from '@musical-patterns/utilities'
import { compileSound, Note, Sound } from '../../../../src/indexForTest'

describe('compile sound', (): void => {
    describe('defaults', (): void => {
        let sound: Sound
        beforeEach((): void => {
            const note: Note = {}
            sound = compileSound(note)
        })

        it('duration to 1', (): void => {
            expect(sound.duration)
                .toBe(musicalAs.Duration(1))
        })

        it('gain to 1', (): void => {
            expect(sound.gain)
                .toBe(musicalAs.Gain(1))
        })

        it('frequency to 1', (): void => {
            expect(sound.tone)
                .toBe(musicalAs.Tone(1))
        })

        it('position to the origin', (): void => {
            expect(sound.location)
                .toEqual([ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)))
        })

        it('sustain to 0.9', (): void => {
            expect(sound.sustain)
                .toBe(musicalAs.Duration(0.9))
        })
    })

    describe('adding dimensions to the position until it is 3D', (): void => {
        it('works when using a non-array position', (): void => {
            const note: Note = {
                position: {
                    scalar: as.Scalar<Position>(3),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.location)
                .toEqual([ 3, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)))
        })

        it('works for a single element position', (): void => {
            const note: Note = {
                position: [
                    {
                        scalar: as.Scalar<Position>(3),
                    },
                ],
            }
            const sound: Sound = compileSound(note)

            expect(sound.location)
                .toEqual([ 3, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)))
        })

        it('works for a two element position', (): void => {
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

            expect(sound.location)
                .toEqual([ 3, 2, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)))
        })
    })

    describe('sustain', (): void => {
        it('caps sustain at slightly less than the duration', (): void => {
            const note: Note = {
                envelope: {
                    scalar: as.Scalar<Value>(8),
                },
                value: {
                    scalar: as.Scalar<Value>(3),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(musicalAs.Duration(3))
            expect(sound.sustain)
                .toEqual(musicalAs.Duration(2.9))
        })

        it('defaults sustain to slightly less than the duration', (): void => {
            const note: Note = {
                value: {
                    scalar: as.Scalar<Value>(3),
                },
            }

            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(musicalAs.Duration(3))
            expect(sound.sustain)
                .toEqual(musicalAs.Duration(2.9))
        })

        it('uses sustain if given and less than duration', (): void => {
            const note: Note = {
                envelope: {
                    scalar: as.Scalar<Value>(2),
                },
                value: {
                    scalar: as.Scalar<Value>(3),
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
