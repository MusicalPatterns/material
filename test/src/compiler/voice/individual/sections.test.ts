import { Amplitude, as, Ms, Scalar } from '@musical-patterns/utilities'
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
        const testNote: Note = { duration: { scalar: as.Scalar<Scalar>(3) } }
        const otherTestNote: Note = { duration: { scalar: as.Scalar<Scalar>(9) } }

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
            duration: as.Translation<Ms>(3),
            frequency: as.Hz(1),
            gain: as.NormalScalar<Amplitude>(1),
            position: [ 0, 0, 0 ].map(as.Meters),
            sustain: as.Translation<Ms>(2.9),
        }
        const otherExpectedSound: Sound = {
            duration: as.Translation<Ms>(9),
            frequency: as.Hz(1),
            gain: as.NormalScalar<Amplitude>(1),
            position: [ 0, 0, 0 ].map(as.Meters),
            sustain: as.Translation<Ms>(8.9),
        }
        expect(actualSoundsAndSectionInfos)
            .toEqual({
                sectionInfos: [
                    {
                        doesRepeatForever: false,
                        totalDuration: as.Translation<Ms>(12),
                    },
                    {
                        doesRepeatForever: true,
                        totalDuration: as.Translation<Ms>(9),
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
