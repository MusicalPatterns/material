import { Maybe, to } from '@musical-patterns/utilities'
import { computeRepetendSounds, Scale, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('compute repetend sounds', () => {
    const scales: Scale[] = []

    it('returns the section that repeats forever, compiled notes to sounds', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
            .toEqual([
                {
                    duration: to.Ms(11),
                    frequency: to.Hz(1),
                    gain: to.Scalar(1),
                    position: [ 0, 0, 0 ].map(to.Meters),
                    sustain: to.Ms(10.9),
                },
            ])
    })

    it('returns undefined when there is no section that repeats forever)', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
            .toEqual(undefined)
    })
})
