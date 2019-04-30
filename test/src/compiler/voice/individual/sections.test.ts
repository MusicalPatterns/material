import { as, musicalAs, Value } from '@musical-patterns/utilities'
import {
    computeIndividualSoundsAndSectionInfos,
    Note,
    Scale,
    Section,
    Sound,
    SoundsAndSectionInfos,
} from '../../../../../src/indexForTest'

describe('compute individual sounds and section infos', () => {
    it(`compiles each of the sections's notes and concatenates them, while reporting information about each of the sections as it goes`, () => {
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
        const scales: Scale[] = []

        const actualSoundsAndSectionInfos: SoundsAndSectionInfos = computeIndividualSoundsAndSectionInfos(sections, { scales })

        const expectedSound: Sound = {
            duration: musicalAs.Duration(3),
            tone: musicalAs.Tone(1),
            gain: musicalAs.Gain(1),
            location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
            sustain: musicalAs.Duration(2.9),
        }
        const otherExpectedSound: Sound = {
            duration: musicalAs.Duration(9),
            tone: musicalAs.Tone(1),
            gain: musicalAs.Gain(1),
            location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
            sustain: musicalAs.Duration(8.9),
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
