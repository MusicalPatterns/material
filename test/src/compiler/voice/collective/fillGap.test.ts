import { Amplitude, to } from '@musical-patterns/utilities'
import { fillGap, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('fill gap', () => {
    it('fills the gap from the individual end time to the collective end time with repetend sounds', () => {
        const originalSounds: Sound[] = [
            {
                duration: to.Ms(8),
                frequency: to.Hz(1),
                gain: to.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(to.Meters),
                sustain: to.Ms(7.9),
            },
        ]
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
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: to.Scalar(11) } } ],
                repetitions: to.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: to.Scalar(11) } } ],
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: to.Ms(30),
            scales: [],
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: to.Ms(8),
                    frequency: to.Hz(1),
                    gain: to.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(7.9),
                },
                {
                    duration: to.Ms(11),
                    frequency: to.Hz(1),
                    gain: to.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(10.9),
                },
                {
                    duration: to.Ms(11),
                    frequency: to.Hz(1),
                    gain: to.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(10.9),
                },
            ])
    })

    it('if this voice has no repetend, return the sounds as is', () => {
        const originalSounds: Sound[] = [
            {
                duration: to.Ms(11),
                frequency: to.Hz(1),
                gain: to.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(to.Meters),
                sustain: to.Ms(10.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(88),
            },
        ]
        const sections: Section[] = [
            {
                notes: [ { duration: { scalar: to.Scalar(11) } } ],
                repetitions: to.Cardinal(9),
            },
            {
                notes: [ { duration: { scalar: to.Scalar(11) } } ],
                repetitions: to.Cardinal(8),
            },
        ]

        const actualFilledGapSounds: Sound[] = fillGap({
            collectiveEndTime: to.Ms(100),
            scales: [],
            sectionInfos,
            sections,
            sounds: originalSounds,
        })

        expect(actualFilledGapSounds)
            .toEqual([
                {
                    duration: to.Ms(11),
                    frequency: to.Hz(1),
                    gain: to.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(10.9),
                },
            ])
    })
})
