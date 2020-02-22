import { as, Duration, musicalAs, NOT_FOUND, NO_DURATION, Ordinal } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual repetend duration', (): void => {
    it('gives the total duration for the section which is the repetend', (): void => {
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

    it('when the voice has no repetend, is zero', (): void => {
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

    it('when the section infos are empty, is zero', (): void => {
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
