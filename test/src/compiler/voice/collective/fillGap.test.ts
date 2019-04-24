import { Amplitude, as, Ms, Scalar } from '@musical-patterns/utilities'
import { fillGap, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('fill gap', () => {
    it('fills the gap from the individual end time to the collective end time with repetend sounds', () => {
        const originalSounds: Sound[] = [
            {
                duration: as.Translation<Ms>(8),
                frequency: as.Hz(1),
                gain: as.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(as.Meters),
                sustain: as.Translation<Ms>(7.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Translation<Ms>(11),
            },
        ]
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
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
                    duration: as.Translation<Ms>(8),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Translation<Ms>(7.9),
                },
                {
                    duration: as.Translation<Ms>(11),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Translation<Ms>(10.9),
                },
                {
                    duration: as.Translation<Ms>(11),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Translation<Ms>(10.9),
                },
            ])
    })

    it('if this voice has no repetend, return the sounds as is', () => {
        const originalSounds: Sound[] = [
            {
                duration: as.Translation<Ms>(11),
                frequency: as.Hz(1),
                gain: as.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(as.Meters),
                sustain: as.Translation<Ms>(10.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(88),
            },
        ]
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
                repetitions: as.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: as.Scalar<Scalar>(11) } } ],
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
                    duration: as.Translation<Ms>(11),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Translation<Ms>(10.9),
                },
            ])
    })
})
