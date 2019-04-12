import { Index, INITIAL, Ms, NO_DURATION, repeat, to } from '@musical-patterns/utilities'
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
                    duration: to.Ms(20),
                    frequency: to.Hz(1),
                    gain: to.Scalar(to.Amplitude(1)),
                    position: [ 0 ].map(to.Meters),
                    sustain: to.Ms(9),
                },
            ],
            to.Cardinal(5),
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

        const index: Index = to.Index(2)

        const entities: Entity[] = [ {}, {}, {
            sections: [
                {
                    notes: [ { duration: { scalar: to.Scalar(11) } } ],
                    repetitions: to.Cardinal(9),
                },
                {
                    notes: [ { duration: { scalar: to.Scalar(11) } } ],
                },
            ],
        } ]

        const scales: Scale[] = []

        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: to.Ms(11),
            },
        ]

        const individualSegnoTime: Ms = to.Ms(60)

        const collectiveSegnoTime: Ms = to.Ms(44)

        const collectiveEndTime: Ms = to.Ms(133)

        const collectiveShareSegnoTime: boolean = false

        const actualVoice: Voice = applyCollectiveInfos({
            collectiveEndTime,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
            entities,
            index,
            individualSegnoTime,
            scales,
            sectionInfos,
            voice,
        })

        expect(actualVoice)
            .toEqual({
                delay: NO_DURATION,
                segnoIndex: to.Index(3),
                sounds: originalSounds.concat([
                    {
                        duration: to.Ms(11),
                        frequency: to.Hz(1),
                        gain: to.Scalar(to.Amplitude(1)),
                        position: [ 0, 0, 0 ].map(to.Meters),
                        sustain: to.Ms(10.9),
                    },
                    {
                        duration: to.Ms(11),
                        frequency: to.Hz(1),
                        gain: to.Scalar(to.Amplitude(1)),
                        position: [ 0, 0, 0 ].map(to.Meters),
                        sustain: to.Ms(10.9),
                    },
                    {
                        duration: to.Ms(11),
                        frequency: to.Hz(1),
                        gain: to.Scalar(to.Amplitude(1)),
                        position: [ 0, 0, 0 ].map(to.Meters),
                        sustain: to.Ms(10.9),
                    },
                ]),
                sourceRequest: {
                    sourceType: SourceType.OSCILLATOR,
                    timbreName: OscillatorName.SINE,
                },
            })
    })
})
