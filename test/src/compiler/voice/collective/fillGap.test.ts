import { as, Duration, Ms, musicalAs } from '@musical-patterns/utilities'
import { fillGap, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('fill gap', () => {
    it('fills the gap from the individual end time to the collective end time with repetend sounds', () => {
        const originalSounds: Sound[] = [
            {
                duration: musicalAs.Duration(8),
                frequency: musicalAs.Pitch(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                sustain: musicalAs.Duration(7.9),
            },
        ]
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
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: as.Scalar<Duration>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: as.Scalar<Duration>(11) } } ],
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: as.Point<Ms>(30),
            scales: [],
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(8),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(7.9),
                },
                {
                    duration: musicalAs.Duration(11),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(10.9),
                },
                {
                    duration: musicalAs.Duration(11),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(10.9),
                },
            ])
    })

    it('if this voice has no repetend, return the sounds as is', () => {
        const originalSounds: Sound[] = [
            {
                duration: musicalAs.Duration(11),
                frequency: musicalAs.Pitch(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                sustain: musicalAs.Duration(10.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(88),
            },
        ]
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: as.Scalar<Duration>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: as.Scalar<Duration>(11) } } ],
                repetitions: as.Cardinal(8),
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: as.Point<Ms>(100),
            scales: [],
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(11),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(10.9),
                },
            ])
    })
})
