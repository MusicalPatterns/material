import { as, Duration, Hz, Meters, Ms } from '@musical-patterns/utilities'
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
        const testNote: Note = { duration: { scalar: as.Scalar<Duration>(3) } }
        const otherTestNote: Note = { duration: { scalar: as.Scalar<Duration>(9) } }

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
            duration: as.Delta<Ms>(3),
            frequency: as.Point<Hz>(1),
            gain: as.Gain(1),
            position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
            sustain: as.Delta<Ms>(2.9),
        }
        const otherExpectedSound: Sound = {
            duration: as.Delta<Ms>(9),
            frequency: as.Point<Hz>(1),
            gain: as.Gain(1),
            position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
            sustain: as.Delta<Ms>(8.9),
        }
        expect(actualSoundsAndSectionInfos)
            .toEqual({
                sectionInfos: [
                    {
                        doesRepeatForever: false,
                        totalDuration: as.Delta<Ms>(12),
                    },
                    {
                        doesRepeatForever: true,
                        totalDuration: as.Delta<Ms>(9),
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
