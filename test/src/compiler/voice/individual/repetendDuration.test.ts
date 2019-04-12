import { Index, Ms, NO_DURATION, to } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration, NON_SEGNO_INDEX, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual repetend duration', () => {
    it('gives the total duration for the section which is the repetend', () => {
        const individualRepetendIndex: Index = to.Index(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(643),
            },
            {
                doesRepeatForever: true,
                totalDuration: to.Ms(7),
            },
        ]

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(to.Ms(7))
    })

    it('when the voice has no repetend, is zero', () => {
        const individualRepetendIndex: Index = NON_SEGNO_INDEX
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(45),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(643),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(7),
            },
        ]

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })

    it('when the section infos are empty, is zero', () => {
        const individualRepetendIndex: Index = to.Index(2)
        const sectionInfos: SectionInfo[] = []

        const actualIndividualRepetendDuration: Ms = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualRepetendDuration)
            .toBe(NO_DURATION)
    })
})
