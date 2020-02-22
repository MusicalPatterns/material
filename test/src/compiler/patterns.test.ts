import {
    as,
    BEGINNING,
    insteadOf,
    Intensity,
    Location,
    musicalAs,
    NO_DURATION,
    ONE_TENTH,
    Pitch,
    Position,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import {
    AbstractName,
    CompiledPattern,
    compilePattern,
    Entity,
    Material,
    Note,
    OscillatorName,
    Scales,
    Sound,
    SourceType,
} from '../../../src/indexForTest'
import { TestSpecs } from '../../support'

describe('compile pattern', (): void => {
    const specs: TestSpecs = {
        testSpec: 3,
    }

    const testNote: (testSpecs: TestSpecs) => Note =
        (testSpecs: TestSpecs): Note => ({
            envelope: { scalar: testSpecs.testSpec },
            intensity: { scalar: use.Scalar(testSpecs.testSpec, ONE_TENTH) },
            pitch: { scalar: testSpecs.testSpec },
            position: { scalar: testSpecs.testSpec },
            value: { scalar: testSpecs.testSpec },
        })
    const expectedSound: Sound = {
        duration: musicalAs.Duration(9),
        gain: musicalAs.Gain(0.9),
        location: [ 9, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
        sustain: musicalAs.Duration(8.9),
        tone: musicalAs.Tone(9),
    }

    const material: Material = {
        materializeEntities: (): Entity[] => [],
        materializeScales: (testSpecs: TestSpecs): Scales => ({
            [ AbstractName.VALUE ]: [
                {
                    scalars: [ insteadOf<Scalar, Value>(testSpecs.testSpec) ],
                },
            ],
            [ AbstractName.PITCH ]: [
                {
                    scalars: [ insteadOf<Scalar, Pitch>(testSpecs.testSpec) ],
                },
            ],
            [ AbstractName.INTENSITY ]: [
                {
                    scalars: [ insteadOf<Scalar, Intensity>(testSpecs.testSpec) ],
                },
            ],
            [ AbstractName.POSITION ]: [
                {
                    scalars: [ insteadOf<Scalar, Position>(testSpecs.testSpec) ],
                },
            ],
        }),
    }

    beforeEach((): void => {
        material.materializeEntities = (testSpecs: TestSpecs): Entity[] => [
            {
                sections: [
                    {
                        notes: [
                            testNote(testSpecs),
                        ],
                    },
                ],
            },
        ]
    })

    it('given specs, takes them into account', async (done: DoneFn): Promise<void> => {
        const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: BEGINNING,
                totalDuration: musicalAs.Duration(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: as.Ordinal<Sound[]>(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
                    },
                ],
            })

        done()
    })

    it('if specs are not explicitly provided to override default, the default is finding the initial specs within the spec key of the pattern, so that you can just pass it a friggin pattern', async (done: DoneFn): Promise<void> => {
        const patternLikeObject: { material: Material, spec: { initialSpecs: TestSpecs } } = {
            material,
            spec: {
                initialSpecs: specs,
            },
        }

        const actualCompiledPattern: CompiledPattern = await compilePattern(patternLikeObject)

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: BEGINNING,
                totalDuration: musicalAs.Duration(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: as.Ordinal<Sound[]>(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
                    },
                ],
            })

        done()
    })

    it('prefers the top-level specs provision to the finding it inside spec key of pattern', async (done: DoneFn): Promise<void> => {
        const patternLikeObject: { material: Material, spec: { initialSpecs: TestSpecs } } = {
            material,
            spec: {
                initialSpecs: {
                    testSpec: as.Scalar<Scalar>(293587293873),
                },
            },
        }

        const actualCompiledPattern: CompiledPattern = await compilePattern({ ...patternLikeObject, specs })

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: BEGINNING,
                totalDuration: musicalAs.Duration(9),
                voices: [
                    {
                        delay: NO_DURATION,
                        segnoIndex: as.Ordinal<Sound[]>(0),
                        sounds: [ expectedSound ],
                        sourceRequest: {
                            sourceType: SourceType.OSCILLATOR,
                            timbreName: OscillatorName.SINE,
                        },
                    },
                ],
            })

        done()
    })
})
