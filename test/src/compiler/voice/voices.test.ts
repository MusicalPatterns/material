import { Amplitude, BEGINNING, INITIAL, NO_DURATION, to } from '@musical-patterns/utilities'
import {
    CompiledPattern,
    compileVoices,
    Entity,
    NON_SEGNO_INDEX,
    Note,
    OscillatorName,
    Scale,
    Sound,
    SourceType,
} from '../../../../src/indexForTest'

describe('compile voices', () => {
    const scales: Scale[] = [ { scalars: [ to.Scalar(3) ] } ]

    const testNote: Note = {
        duration: { scalar: to.Scalar(3) },
        gain: { scalar: to.Scalar(3) },
        pitch: { scalar: to.Scalar(3) },
        position: { scalar: to.Scalar(3) },
        sustain: { scalar: to.Scalar(3) },
    }
    const expectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(9),
        gain: to.Scalar<Amplitude>(9),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    const otherTestNote: Note = {
        duration: { scalar: to.Scalar(3) },
        gain: { scalar: to.Scalar(0) },
        pitch: { scalar: to.Scalar(3) },
        position: { scalar: to.Scalar(3) },
        sustain: { scalar: to.Scalar(3) },
    }
    const otherExpectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(9),
        gain: to.Scalar<Amplitude>(0),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    const otherOtherTestNote: Note = {
        duration: { scalar: to.Scalar(3) },
        gain: { scalar: to.Scalar(3) },
        pitch: { scalar: to.Scalar(0) },
        position: { scalar: to.Scalar(3) },
        sustain: { scalar: to.Scalar(3) },
    }
    const otherOtherExpectedSound: Sound = {
        duration: to.Ms(9),
        frequency: to.Hz(0),
        gain: to.Scalar<Amplitude>(9),
        position: [ 9, 0, 0 ].map(to.Meters),
        sustain: to.Ms(8.9),
    }

    describe('when all entities enumerate their repetitions i.e. the song ends instead of repeating forever', () => {
        it('each voice has a segno index of -1 indicating for the performer to stop updating it when it reaches its end', () => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                otherTestNote,
                                testNote,
                            ],
                            repetitions: to.Cardinal(3),
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
                            repetitions: to.Cardinal(2),
                        },
                    ],
                },
            ]

            const actualCompiledPattern: CompiledPattern = compileVoices({ entities, scales })

            expect(actualCompiledPattern)
                .toEqual({
                    segnoTime: to.Ms(-1),
                    totalDuration: to.Ms(54),
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

    describe('when some entities repeat forever but others do not', () => {
        it('the voices which do not repeat forever have segno indices of -1 and the ones which do repeat forever have a segno index of their first note which comes after the time position where all voices which eventually repeat forever start doing so', () => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                            ],
                            repetitions: to.Cardinal(4),
                        },
                    ],
                },
                {
                    sections: [
                        {
                            notes: [
                                otherOtherTestNote,
                            ],
                            repetitions: to.Cardinal(3),
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
                    segnoTime: to.Ms(27),
                    totalDuration: to.Ms(45),
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
                            segnoIndex: to.Ordinal(3),
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
                            segnoIndex: to.Ordinal(3),
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

    describe('when all entities repeat forever but some have intro sections', () => {
        it('each voice has a segno index of their first note which comes after the time position where the pattern as a whole starts to repeat, plus voices that are repeating need to be extended to fill out the gap until the end of the section that will be repeating which is the length of the LCM of all the repeating segments', () => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                testNote,
                            ],
                            repetitions: to.Cardinal(1),
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
                    segnoTime: to.Ms(9),
                    totalDuration: to.Ms(99),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: to.Ordinal(1),
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
                            segnoIndex: to.Ordinal(1),
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

    describe('when all entities repeat forever and some have intro sections but the intro sections are all the same length such that the collective repetend begins simultaneously', () => {
        it('there is no need to extend to fill the gap', () => {
            const entities: Entity[] = [
                {
                    sections: [
                        {
                            notes: [
                                otherOtherTestNote,
                            ],
                            repetitions: to.Cardinal(3),
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
                            repetitions: to.Cardinal(1),
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
                    segnoTime: to.Ms(27),
                    totalDuration: to.Ms(117),
                    voices: [
                        {
                            delay: NO_DURATION,
                            segnoIndex: to.Ordinal(3),
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
                            segnoIndex: to.Ordinal(3),
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

    describe('when all entities repeat forever from the beginning', () => {
        it('each voice has a segno index of 0', () => {
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
                    totalDuration: to.Ms(54),
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
