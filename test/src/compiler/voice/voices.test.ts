import {
    as,
    BEGINNING,
    INITIAL,
    Intensity,
    Location,
    Ms,
    musicalAs,
    NO_DURATION,
    Pitch,
    Position,
    Value,
} from '@musical-patterns/utilities'
import {
    AbstractName,
    CompiledPattern,
    compileVoices,
    Entity,
    NON_SEGNO_INDEX,
    Note,
    OscillatorName,
    Scales,
    Sound,
    SourceType,
} from '../../../../src/indexForTest'

describe('compile voices', (): void => {
    const scales: Scales = {
        [ AbstractName.VALUE ]: [ { scalars: [ as.Scalar<Value>(3) ] } ],
        [ AbstractName.INTENSITY ]: [ { scalars: [ as.Scalar<Intensity>(3) ] } ],
        [ AbstractName.PITCH ]: [ { scalars: [ as.Scalar<Pitch>(3) ] } ],
        [ AbstractName.POSITION ]: [ { scalars: [ as.Scalar<Position>(3) ] } ],
    }

    const testNote: Note = {
        envelope: { scalar: as.Scalar<Value>(3) },
        intensity: { scalar: as.Scalar<Intensity>(0.3) },
        pitch: { scalar: as.Scalar<Pitch>(3) },
        position: { scalar: as.Scalar<Position>(3) },
        value: { scalar: as.Scalar<Value>(3) },
    }
    const expectedSound: Sound = {
        duration: musicalAs.Duration(9),
        gain: musicalAs.Gain(0.9),
        location: [ 9, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
        sustain: musicalAs.Duration(8.9),
        tone: musicalAs.Tone(9),
    }

    const otherTestNote: Note = {
        envelope: { scalar: as.Scalar<Value>(3) },
        intensity: { scalar: as.Scalar<Intensity>(0) },
        pitch: { scalar: as.Scalar<Pitch>(3) },
        position: { scalar: as.Scalar<Position>(3) },
        value: { scalar: as.Scalar<Value>(3) },
    }
    const otherExpectedSound: Sound = {
        duration: musicalAs.Duration(9),
        gain: musicalAs.Gain(0),
        location: [ 9, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
        sustain: musicalAs.Duration(8.9),
        tone: musicalAs.Tone(9),
    }

    const otherOtherTestNote: Note = {
        envelope: { scalar: as.Scalar<Value>(3) },
        intensity: { scalar: as.Scalar<Intensity>(0.3) },
        pitch: { scalar: as.Scalar<Pitch>(0) },
        position: { scalar: as.Scalar<Position>(3) },
        value: { scalar: as.Scalar<Value>(3) },
    }
    const otherOtherExpectedSound: Sound = {
        duration: musicalAs.Duration(9),
        gain: musicalAs.Gain(0.9),
        location: [ 9, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
        sustain: musicalAs.Duration(8.9),
        tone: musicalAs.Tone(0),
    }

    describe('when all entities enumerate their repetitions i.e. the song ends instead of repeating forever', (): void => {
        it('each voice has a segno index of -1 indicating for the performer to stop updating it when it reaches its end', (): void => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                            repetitions: as.Cardinal(3),
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                                otherTestNote,
                            ],
                            repetitions: as.Cardinal(2),
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: as.Point<Ms>(-1),
                    totalDuration: musicalAs.Duration(54),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: NON_SEGNO_INDEX,
                            sounds: [
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: NON_SEGNO_INDEX,
                            sounds: [
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                    ],
                })
        })
    })

    describe('when some entities repeat forever but others do not', (): void => {
        it('the voices which do not repeat forever have segno indices of -1 and the ones which do repeat forever have a segno index of their first note which comes after the time position where all voices which eventually repeat forever start doing so', (): void => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                            ],
                            repetitions: as.Cardinal(4),
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                otherOtherTestNote,
                            ],
                            repetitions: as.Cardinal(3),
                        },
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                                otherTestNote,
                            ],
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: as.Point<Ms>(27),
                    totalDuration: musicalAs.Duration(45),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: NON_SEGNO_INDEX,
                            sounds: [
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(3),
                            sounds: [
                                otherOtherExpectedSound,
                                otherOtherExpectedSound,
                                otherOtherExpectedSound,
                                otherExpectedSound,
                                expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(3),
                            sounds: [
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                    ],
                })
        })
    })

    describe('when all entities repeat forever but some have intro sections', (): void => {
        it('each voice has a segno index of their first note which comes after the time position where the pattern as a whole starts to repeat, plus voices that are repeating need to be extended to fill out the gap until the end of the section that will be repeating which is the length of the LCM of all the repeating segments', (): void => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                            ],
                            repetitions: as.Cardinal(1),
                        },
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                                testNote,
                                testNote,
                                testNote,
                            ],
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: as.Point<Ms>(9),
                    totalDuration: musicalAs.Duration(99),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(1),
                            sounds: [
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(1),
                            sounds: [
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                                expectedSound,
                                otherExpectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                    ],
                })
        })
    })

    describe('when all entities repeat forever and some have intro sections but the intro sections are all the same length such that the collective repetend begins simultaneously', (): void => {
        it('there is no need to extend to fill the gap', (): void => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                otherOtherTestNote,
                            ],
                            repetitions: as.Cardinal(3),
                        },
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                                testNote,
                                testNote,
                                testNote,
                            ],
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                otherOtherTestNote,
                                testNote,
                                otherOtherTestNote,
                            ],
                            repetitions: as.Cardinal(1),
                        },
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: as.Point<Ms>(27),
                    totalDuration: musicalAs.Duration(117),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(3),
                            sounds: [
                                otherOtherExpectedSound,
                                otherOtherExpectedSound,
                                otherOtherExpectedSound,
                                otherExpectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: as.Ordinal<Sound[]>(3),
                            sounds: [
                                otherOtherExpectedSound,
                                expectedSound,
                                otherOtherExpectedSound,
                                otherExpectedSound,
                                expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                    ],
                })
        })
    })

    describe('when all entities repeat forever from the beginning', (): void => {
        it('each voice has a segno index of 0', (): void => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                                testNote,
                            ],
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: BEGINNING,
                    totalDuration: musicalAs.Duration(54),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: INITIAL,
                            sounds: [
                                otherExpectedSound,
                                expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                        {
                            delay: NO_DURATION,
                            segnoIndex: INITIAL,
                            sounds: [
                                otherExpectedSound,
                                expectedSound,
                                expectedSound,
                                // Listener will see before time repeats in playroom: otherExpectedSound,
                                // Listener will see before time repeats in playroom: expectedSound,
                                // Listener will see before time repeats in playroom: expectedSound
                            ],
                            sourceRequest: {
                                sourceType: SourceType.OSCILLATOR,
                                timbreName: OscillatorName.SINE,
                            },
                        },
                    ],
                })
        })
    })
})
