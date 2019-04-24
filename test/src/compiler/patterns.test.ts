import {
    Amplitude,
    as,
    BEGINNING,
    insteadOf,
    Ms,
    NO_DURATION,
    ONE_TENTH,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import {
    CompiledPattern,
    compilePattern,
    Entity,
    Material,
    Note,
    OscillatorName,
    Scale,
    Sound,
    SourceType,
} from '../../../src/indexForTest'
import { TestSpecs } from '../../support'

describe('compile pattern', () => {
    const specs: TestSpecs = {
        testSpec: as.Scalar<Scalar>(3),
    }

    const testNote: (testSpecs: TestSpecs) => Note =
        (testSpecs: TestSpecs): Note => ({
            duration: { scalar: testSpecs.testSpec },
            gain: { scalar: use.Scalar(testSpecs.testSpec, ONE_TENTH) },
            pitch: { scalar: testSpecs.testSpec },
            position: { scalar: testSpecs.testSpec },
            sustain: { scalar: testSpecs.testSpec },
        })
    const expectedSound: Sound = {
        duration: as.Translation<Ms>(9),
        frequency: as.Hz(9),
        gain: as.NormalScalar<Amplitude>(0.9),
        position: [ 9, 0, 0 ].map(as.Meters),
        sustain: as.Translation<Ms>(8.9),
    }

    const material: Material = {
        materializeEntities: (): Entity[] => [],
        materializeScales: (testSpecs: TestSpecs): Scale[] => [
            {
                scalars: [ insteadOf<Scalar>(testSpecs.testSpec) ],
            },
        ],
    }

    beforeEach(() => {
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

    it('given specs, takes them into account', async (done: DoneFn) => {
        const actualCompiledPattern: CompiledPattern = await compilePattern({ material, specs })

        expect(actualCompiledPattern)
            .toEqual({
                segnoTime: BEGINNING,
                totalDuration: as.Translation<Ms>(9),
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

    it('if specs are not explicitly provided to override default, the default is finding the initial specs within the spec key of the pattern, so that you can just pass it a friggin pattern', async (done: DoneFn) => {
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
                totalDuration: as.Translation<Ms>(9),
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

    it('prefers the top-level specs provision to the finding it inside spec key of pattern', async (done: DoneFn) => {
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
                totalDuration: as.Translation<Ms>(9),
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
