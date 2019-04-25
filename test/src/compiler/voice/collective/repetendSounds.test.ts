import { as, Duration, Hz, Maybe, Meters, Ms, Point } from '@musical-patterns/utilities'
import { computeRepetendSounds, Scale, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('compute repetend sounds', () => {
    const scales: Scale[] = []

    it('returns the section that repeats forever, compiled notes to sounds', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
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

    it('returns undefined when there is no section that repeats forever)', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
            .toEqual(undefined)
    })
})
