import { Amplitude, to } from '@musical-patterns/utilities'
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
                .toBe(to.Ms(1))
        })

        it('gain to 1', () => {
            expect(sound.gain)
                .toBe(to.Scalar<Amplitude>(1))
        })

        it('frequency to 1', () => {
            expect(sound.frequency)
                .toBe(to.Hz(1))
        })

        it('position to the origin', () => {
            expect(sound.position)
                .toEqual([ 0, 0, 0 ].map(to.Meters))
        })

        it('sustain to 0.9', () => {
            expect(sound.sustain)
                .toBe(to.Ms(0.9))
        })
    })

    describe('adding dimensions to the position until it is 3D', () => {
        it('works when using a non-array position', () => {
            const note: Note = {
                position: {
                    scalar: to.Scalar(3),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 0, 0 ].map(to.Meters))
        })

        it('works for a single element position', () => {
            const note: Note = {
                position: [
                    {
                        scalar: to.Scalar(3),
                    },
                ],
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 0, 0 ].map(to.Meters))
        })

        it('works for a two element position', () => {
            const note: Note = {
                position: [
                    {
                        scalar: to.Scalar(3),
                    },
                    {
                        scalar: to.Scalar(2),
                    },
                ],
            }
            const sound: Sound = compileSound(note)

            expect(sound.position)
                .toEqual([ 3, 2, 0 ].map(to.Meters))
        })
    })

    describe('sustain', () => {
        it('caps sustain at slightly less than the duration', () => {
            const note: Note = {
                duration: {
                    scalar: to.Scalar(3),
                },
                sustain: {
                    scalar: to.Scalar(8),
                },
            }
            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(to.Ms(3))
            expect(sound.sustain)
                .toEqual(to.Ms(2.9))
        })

        it('defaults sustain to slightly less than the duration', () => {
            const note: Note = {
                duration: {
                    scalar: to.Scalar(3),
                },
            }

            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(to.Ms(3))
            expect(sound.sustain)
                .toEqual(to.Ms(2.9))
        })

        it('uses sustain if given and less than duration', () => {
            const note: Note = {
                duration: {
                    scalar: to.Scalar(3),
                },
                sustain: {
                    scalar: to.Scalar(2),
                },
            }

            const sound: Sound = compileSound(note)

            expect(sound.duration)
                .toEqual(to.Ms(3))
            expect(sound.sustain)
                .toEqual(to.Ms(2))
        })
    })
})
