import { Amplitude, as, INITIAL, Ms, NO_DURATION, Ordinal, repeat, Scalar } from '@musical-patterns/utilities'
import {
    applyCollectiveInfos,
    Entity,
    OscillatorName,
    Scale,
    SectionInfo,
    Sound,
    SourceType,
    Voice,
} from '../../../../../src/indexForTest'

describe('apply collective infos', () => {
    it('adds the segno index and extends sounds to fill the gap (this example is frankenstein and does not really internally agree; this test is kind of at too much of an integration level to be super useful)', () => {
        const originalSounds: Sound[] = repeat(
            [
                {
                    duration: as.Ms(20),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0 ].map(as.Meters),
                    sustain: as.Ms(9),
                },
            ],
            as.Cardinal<Sound[]>(5),
        )
        const voice: Voice = {
            delay: NO_DURATION,
            segnoIndex: INITIAL,
            sounds: originalSounds,
            sourceRequest: {
                sourceType: SourceType.OSCILLATOR,
                timbreName: OscillatorName.SINE,
            },
        }

        const entityIndex: Ordinal<Entity[]> = as.Ordinal<Entity[]>(2)

        const entities: Entity[] = [ {}, {}, {
            sections: [
                {
                    notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
                    repetitions: as.Cardinal(9),
                },
                {
                    notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
                },
            ],
        } ]

        const scales: Scale[] = []

        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Ms(11),
            },
        ]

        const individualSegnoTime: Point<Ms> = as.Ms(60)

        const collectiveSegnoTime: Point<Ms> = as.Ms(44)

        const collectiveEndTime: Ms = as.Ms(133)

        const collectiveShareSegnoTime: boolean = false

        const actualVoice: Voice = applyCollectiveInfos({
            collectiveEndTime,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
            entities,
            entityIndex,
            individualSegnoTime,
            scales,
            sectionInfos,
            voice,
        })

        expect(actualVoice)
            .toEqual({
                delay: NO_DURATION,
                segnoIndex: as.Ordinal<Sound[]>(3),
                sounds: originalSounds.concat([
                    {
                        duration: as.Ms(11),
                        frequency: as.Hz(1),
                        gain: as.NormalScalar<Amplitude>(1),
                        position: [ 0, 0, 0 ].map(as.Meters),
                        sustain: as.Ms(10.9),
                    },
                    {
                        duration: as.Ms(11),
                        frequency: as.Hz(1),
                        gain: as.NormalScalar<Amplitude>(1),
                        position: [ 0, 0, 0 ].map(as.Meters),
                        sustain: as.Ms(10.9),
                    },
                    {
                        duration: as.Ms(11),
                        frequency: as.Hz(1),
                        gain: as.NormalScalar<Amplitude>(1),
                        position: [ 0, 0, 0 ].map(as.Meters),
                        sustain: as.Ms(10.9),
                    },
                ]),
                sourceRequest: {
                    sourceType: SourceType.OSCILLATOR,
                    timbreName: OscillatorName.SINE,
                },
            })
    })
})
