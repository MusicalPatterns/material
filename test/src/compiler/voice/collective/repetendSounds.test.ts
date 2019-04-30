import { as, Maybe, musicalAs, Value } from '@musical-patterns/utilities'
import { computeRepetendSounds, Scale, Section, SectionInfo, Sound } from '../../../../../src/indexForTest'

describe('compute repetend sounds', () => {
    const scales: Scale[] = []

    it('returns the section that repeats forever, compiled notes to sounds', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(11),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(10.9),
                    tone: musicalAs.Tone(1),
                },
            ])
    })

    it('returns undefined when there is no section that repeats forever)', () => {
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

        const actualSounds: Maybe<Sound[]> = computeRepetendSounds({ scales, sectionInfos, sections })

        expect(actualSounds)
            .toEqual(undefined)
    })
})
