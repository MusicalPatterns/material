import { Amplitude, as, INITIAL, Ms, NO_DURATION } from '@musical-patterns/utilities'
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
        const startTime: Ms = as.Ms(2)

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
                            duration: as.Ms(5),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(4),
                        },
                        {
                            duration: as.Ms(3),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = as.Ms(2)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Ms(5))
            expect(preparedVoice.nextStart)
                .toBe(as.Ms(5))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound>(1))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the beginning', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: as.Ms(5),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(4),
                        },
                        {
                            duration: as.Ms(3),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = as.Ms(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Ms(16))
            expect(preparedVoice.nextStart)
                .toBe(as.Ms(16))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound>(0))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the segno index, if a segno index is provided', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: as.Ordinal<Sound>(1),
                    sounds: [
                        {
                            duration: as.Ms(5),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(4),
                        },
                        {
                            duration: as.Ms(1),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(1),
                        },
                        {
                            duration: as.Ms(3),
                            frequency: as.Hz(1),
                            gain: as.NormalScalar<Amplitude>(1),
                            position: [ 1 ].map(as.Meters),
                            sustain: as.Ms(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Ms = as.Ms(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Ms(14))
            expect(preparedVoice.nextStart)
                .toBe(as.Ms(14))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound>(2))

            done()
        })
    })
})
