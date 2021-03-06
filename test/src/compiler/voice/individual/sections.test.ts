import { as, Location, musicalAs, Value } from '@musical-patterns/utilities'
import {
    computeIndividualSoundsAndSectionInfos,
    Note,
    Scales,
    Section,
    Sound,
    SoundsAndSectionInfos,
} from '../../../../../src/indexForTest'

describe('compute individual sounds and section infos', (): void => {
    it(`compiles each of the sections's notes and concatenates them, while reporting information about each of the sections as it goes`, (): void => {
        const testNote: Note = { value: { scalar: as.Scalar<Value>(3) } }
        const otherTestNote: Note = { value: { scalar: as.Scalar<Value>(9) } }

        const sections: Section[] = [
            {
                notes: [ testNote ],
                repetitions: as.Cardinal(4),
            },
            {
                notes: [ otherTestNote ],
            },
        ]
        const scales: Scales = {}

        const actualSoundsAndSectionInfos: SoundsAndSectionInfos = computeIndividualSoundsAndSectionInfos(sections, { scales })

        const expectedSound: Sound = {
            duration: musicalAs.Duration(3),
            gain: musicalAs.Gain(1),
            location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
            sustain: musicalAs.Duration(2.9),
            tone: musicalAs.Tone(1),
        }
        const otherExpectedSound: Sound = {
            duration: musicalAs.Duration(9),
            gain: musicalAs.Gain(1),
            location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
            sustain: musicalAs.Duration(8.9),
            tone: musicalAs.Tone(1),
        }
        expect(actualSoundsAndSectionInfos)
            .toEqual({
                sectionInfos: [
                    {
                        doesRepeatForever: false,
                        totalDuration: musicalAs.Duration(12),
                    },
                    {
                        doesRepeatForever: true,
                        totalDuration: musicalAs.Duration(9),
                    },
                ],
                sounds: [
                    expectedSound,
                    expectedSound,
                    expectedSound,
                    expectedSound,
                    otherExpectedSound,
                ],
            })
    })
})
