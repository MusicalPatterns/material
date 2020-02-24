import {
    as,
    INITIAL,
    Location,
    Ms,
    musicalAs,
    NO_DURATION,
    Ordinal,
    Point,
    repeat,
    Value,
} from '@musical-patterns/utilities'
import {
    applyCollectiveInfos,
    Entity,
    OscillatorName,
    Scales,
    SectionInfo,
    Sound,
    SourceType,
    Voice,
} from '../../../../../src/indexForTest'

describe('apply collective infos', (): void => {
    it('adds the segno index and extends sounds to fill the gap (this example is frankenstein and does not really internally agree; this test is kind of at too much of an integration level to be super useful)', (): void => {
        const originalSounds: Sound[] = repeat(
            [
                {
                    duration: musicalAs.Duration(20),
                    gain: musicalAs.Gain(1),
                    location: [ 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(9),
                    tone: musicalAs.Tone(1),
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
                    notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
                    repetitions: as.Cardinal(9),
                },
                {
                    notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
                },
            ],
        } ]

        const scales: Scales = {}

        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: musicalAs.Duration(11),
            },
        ]

        const individualSegnoTime: Point<Ms> = as.Point<Ms>(60)

        const collectiveSegnoTime: Point<Ms> = as.Point<Ms>(44)

        const collectiveEndTime: Point<Ms> = as.Point<Ms>(133)

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
                        duration: musicalAs.Duration(11),
                        gain: musicalAs.Gain(1),
                        location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                        sustain: musicalAs.Duration(10.9),
                        tone: musicalAs.Tone(1),
                    },
                    {
                        duration: musicalAs.Duration(11),
                        gain: musicalAs.Gain(1),
                        location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                        sustain: musicalAs.Duration(10.9),
                        tone: musicalAs.Tone(1),
                    },
                    {
                        duration: musicalAs.Duration(11),
                        gain: musicalAs.Gain(1),
                        location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                        sustain: musicalAs.Duration(10.9),
                        tone: musicalAs.Tone(1),
                    },
                ]),
                sourceRequest: {
                    sourceType: SourceType.OSCILLATOR,
                    timbreName: OscillatorName.SINE,
                },
            })
    })
})
