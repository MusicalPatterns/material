import { as, Duration, Hz, Meters, Ms, Point } from '@musical-patterns/utilities'
import { fillGap, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('fill gap', () => {
    it('fills the gap from the individual end time to the collective end time with repetend sounds', () => {
        const originalSounds: Sound[] = [
            {
                duration: as.Translation<Point<Ms>>(8),
                frequency: as.Point<Hz>(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                sustain: as.Translation<Point<Ms>>(7.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Point<Ms>>(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Translation<Point<Ms>>(11),
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
                    duration: as.Translation<Point<Ms>>(8),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Translation<Point<Ms>>(7.9),
                },
                {
                    duration: as.Translation<Point<Ms>>(11),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Translation<Point<Ms>>(10.9),
                },
                {
                    duration: as.Translation<Point<Ms>>(11),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Translation<Point<Ms>>(10.9),
                },
            ])
    })

    it('if this voice has no repetend, return the sounds as is', () => {
        const originalSounds: Sound[] = [
            {
                duration: as.Translation<Point<Ms>>(11),
                frequency: as.Point<Hz>(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                sustain: as.Translation<Point<Ms>>(10.9),
            },
        ]
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Point<Ms>>(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Point<Ms>>(88),
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
                    duration: as.Translation<Point<Ms>>(11),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Translation<Point<Ms>>(10.9),
                },
            ])
    })
})
