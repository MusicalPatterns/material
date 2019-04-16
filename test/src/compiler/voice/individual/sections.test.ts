import { Amplitude, to } from '@musical-patterns/utilities'
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
        const testNote: Note = { duration: { scalar: to.Scalar(3) } }
        const otherTestNote: Note = { duration: { scalar: to.Scalar(9) } }

        const sections: Section[] = [
            {
                notes: [ testNote ],
                repetitions: to.Cardinal(4),
            },
            {
                notes: [ otherTestNote ],
            },
        ]
        const scales: Scale[] = []

        const actualSoundsAndSectionInfos: SoundsAndSectionInfos = computeIndividualSoundsAndSectionInfos(sections, { scales })

        const expectedSound: Sound = {
            duration: to.Ms(3),
            frequency: to.Hz(1),
            gain: to.Scalar<Amplitude>(1),
            position: [ 0, 0, 0 ].map(to.Meters),
            sustain: to.Ms(2.9),
        }
        const otherExpectedSound: Sound = {
            duration: to.Ms(9),
            frequency: to.Hz(1),
            gain: to.Scalar<Amplitude>(1),
            position: [ 0, 0, 0 ].map(to.Meters),
            sustain: to.Ms(8.9),
        }
        expect(actualSoundsAndSectionInfos)
            .toEqual({
                sectionInfos: [
                    {
                        doesRepeatForever: false,
                        totalDuration: to.Ms(12),
                    },
                    {
                        doesRepeatForever: true,
                        totalDuration: to.Ms(9),
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
