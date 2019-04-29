import { as, Duration, Ms, musicalAs, NO_DURATION, NOT_FOUND, Ordinal } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual repetend duration', () => {
    it('gives the total duration for the section which is the repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(643),
            },
            {
                doesRepeatForever: true,
                totalDuration: musicalAs.Duration(7),
            },
        ]

        const actualIndividualRepetendDuration: Duration = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(musicalAs.Duration(7))
    })

    it('when the voice has no repetend, is zero', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = NOT_FOUND
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(643),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(7),
            },
        ]

        const actualIndividualRepetendDuration: Duration = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })

    it('when the section infos are empty, is zero', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = []

        const actualIndividualRepetendDuration: Duration = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })
})
