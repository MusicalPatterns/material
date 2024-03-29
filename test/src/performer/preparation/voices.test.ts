import { as, INITIAL, Location, Ms, musicalAs, NO_DURATION, Point } from '@musical-patterns/utilities'
import { OscillatorName, PreparedVoice, prepareVoices, Sound, SourceType, Voice } from '../../../../src/indexForTest'

describe('prepare voices', (): void => {
    it('does not crash if a voice with empty sounds is prepared when the time is not at the beginning', async (): Promise<void> => {
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
    })

    describe('when provided a start time', (): void => {
        it('picks the correct first sound index, and the correct time when the next sound will start', async (): Promise<void> => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: musicalAs.Duration(5),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(4),
                            tone: musicalAs.Tone(1),
                        },
                        {
                            duration: musicalAs.Duration(3),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(1),
                            tone: musicalAs.Tone(1),
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
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the beginning', async (): Promise<void> => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: INITIAL,
                    sounds: [
                        {
                            duration: musicalAs.Duration(5),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(4),
                            tone: musicalAs.Tone(1),
                        },
                        {
                            duration: musicalAs.Duration(3),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(1),
                            tone: musicalAs.Tone(1),
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
        })

        it('if the start time is longer than the pattern itself, it keeps repeating from the segno index, if a segno index is provided', async (): Promise<void> => {
            const voices: Voice[] = [
                {
                    delay: NO_DURATION,
                    segnoIndex: as.Ordinal<Sound[]>(1),
                    sounds: [
                        {
                            duration: musicalAs.Duration(5),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(4),
                            tone: musicalAs.Tone(1),
                        },
                        {
                            duration: musicalAs.Duration(1),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(1),
                            tone: musicalAs.Tone(1),
                        },
                        {
                            duration: musicalAs.Duration(3),
                            gain: musicalAs.Gain(1),
                            location: [ 1 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                            sustain: musicalAs.Duration(1),
                            tone: musicalAs.Tone(1),
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
        })
    })
})
