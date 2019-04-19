import { Amplitude, INITIAL, Ms, NO_DURATION, to } from '@musical-patterns/utilities'
import { OscillatorName, PreparedVoice, prepareVoices, Sound, SourceType, Voice } from '../../../../src/indexForTest'

describe('prepare voices', () => {
    it('does not crash if a voice with empty sounds is prepared when the time position is not at the beginning', async (done: DoneFn) => {
        const voices: Voice[] = [
            {
                delay: NO_DURATION,
                segnoIndex: INITIAL,
                sounds: [],
                sourceRequest: {
                    sourceType: SourceType.OSCILLATOR,
                    timbreName: OscillatorName.SINE,
                },
            },
        ]
        const startTime: Ms = to.Ms(2)

        await prepareVoices(voices, startTime)
        done()
    })

    describe('when provided a start time', () => {
        it('picks the correct first sound index, and the correct time when the next sound will start', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: to.Ms(5),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(4),
                        },
                        {
                            duration: to.Ms(3),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = to.Ms(2)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(to.Ms(5))
            expect(preparedVoice.nextStart)
                .toBe(to.Ms(5))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal<Sound>(1))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the beginning', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: to.Ms(5),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(4),
                        },
                        {
                            duration: to.Ms(3),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = to.Ms(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(to.Ms(16))
            expect(preparedVoice.nextStart)
                .toBe(to.Ms(16))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal<Sound>(0))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the segno index, if a segno index is provided', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: to.Ordinal<Sound>(1),
                    sounds: [
                        {
                            duration: to.Ms(5),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(4),
                        },
                        {
                            duration: to.Ms(1),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                        {
                            duration: to.Ms(3),
                            frequency: to.Hz(1),
                            gain: to.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(to.Meters),
                            sustain: to.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = to.Ms(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(to.Ms(14))
            expect(preparedVoice.nextStart)
                .toBe(to.Ms(14))
            expect(preparedVoice.soundIndex)
                .toBe(to.Ordinal<Sound>(2))

            done()
        })
    })
})
