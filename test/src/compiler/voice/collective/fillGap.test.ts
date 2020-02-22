import { as, Location, Ms, musicalAs, Value } from '@musical-patterns/utilities'
import { fillGap, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('fill gap', (): void => {
    it('fills the gap from the individual end time to the collective end time with repetend sounds', (): void => {
        const originalSounds: Sound[] = [
            {
                duration: musicalAs.Duration(8),
                gain: musicalAs.Gain(1),
                location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                sustain: musicalAs.Duration(7.9),
                tone: musicalAs.Tone(1),
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
                notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: as.Point<Ms>(30),
            scales: {},
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(8),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(7.9),
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
            ])
    })

    it('if this voice has no repetend, return the sounds as is', (): void => {
        const originalSounds: Sound[] = [
            {
                duration: musicalAs.Duration(11),
                gain: musicalAs.Gain(1),
                location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                sustain: musicalAs.Duration(10.9),
                tone: musicalAs.Tone(1),
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
                notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { value: { scalar: as.Scalar<Value>(11) } } ],
                repetitions: as.Cardinal(8),
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: as.Point<Ms>(100),
            scales: {},
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(11),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(10.9),
                    tone: musicalAs.Tone(1),
                },
            ])
    })
})
