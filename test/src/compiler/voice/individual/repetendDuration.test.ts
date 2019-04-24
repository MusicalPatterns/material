import { as, Ms, NO_DURATION, NOT_FOUND, Ordinal, Translation } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual repetend duration', () => {
    it('gives the total duration for the section which is the repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(643),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Translation<Ms>(7),
            },
        ]

        const actualIndividualRepetendDuration: Translation<Ms> = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(as.Translation<Ms>(7))
    })

    it('when the voice has no repetend, is zero', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = NOT_FOUND
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(643),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Translation<Ms>(7),
            },
        ]

        const actualIndividualRepetendDuration: Translation<Ms> = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })

    it('when the section infos are empty, is zero', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = []

        const actualIndividualRepetendDuration: Translation<Ms> = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })
})
