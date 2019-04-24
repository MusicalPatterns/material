import { as, Hz, INITIAL, Meters, Ms, NO_DURATION, Point } from '@musical-patterns/utilities'
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
        const startTime: Point<Ms> = as.Point<Ms>(2)

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
                            duration: as.Translation<Point<Ms>>(5),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(4),
                        },
                        {
                            duration: as.Translation<Point<Ms>>(3),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Point<Ms> = as.Point<Ms>(2)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Point<Ms>(5))
            expect(preparedVoice.nextStart)
                .toBe(as.Point<Ms>(5))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound[]>(1))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the beginning', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: as.Translation<Point<Ms>>(5),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(4),
                        },
                        {
                            duration: as.Translation<Point<Ms>>(3),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Point<Ms> = as.Point<Ms>(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Point<Ms>(16))
            expect(preparedVoice.nextStart)
                .toBe(as.Point<Ms>(16))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound[]>(0))

            done()
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the segno index, if a segno index is provided', async (done: DoneFn) => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: as.Ordinal<Sound[]>(1),
                    sounds: [
                        {
                            duration: as.Translation<Point<Ms>>(5),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(4),
                        },
                        {
                            duration: as.Translation<Point<Ms>>(1),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(1),
                        },
                        {
                            duration: as.Translation<Point<Ms>>(3),
                            frequency: as.Point<Hz>(1),
                            gain: as.Amplitude(1),
                            position: [ 1 ].map((dimension: number) => as.Point<Meters>(dimension)),
                            sustain: as.Translation<Point<Ms>>(1),
                        },
                    ],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            ]
            const startTime: Point<Ms> = as.Point<Ms>(14)

            const preparedVoices: PreparedVoice[] = await prepareVoices(voices, startTime)
            const preparedVoice: PreparedVoice = preparedVoices[ 0 ]

            expect(preparedVoice.nextStop)
                .toBe(as.Point<Ms>(14))
            expect(preparedVoice.nextStart)
                .toBe(as.Point<Ms>(14))
            expect(preparedVoice.soundIndex)
                .toBe(as.Ordinal<Sound[]>(2))

            done()
        })
    })
})
