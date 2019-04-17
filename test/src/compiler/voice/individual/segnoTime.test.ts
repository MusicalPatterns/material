import { Ordinal, Ms, NOT_FOUND, to } from '@musical-patterns/utilities'
import { computeIndividualSegnoTime, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual segno time', () => {
    it('sums the durations of the sections leading up to the repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo> = to.Ordinal<SectionInfo>(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(33),
            },
            {
                doesRepeatForever: true,
                totalDuration: to.Ms(4236),
            },
        ]

        const actualIndividualSegnoTime: Ms = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(to.Ms(132))
    })

    it('gives -1 if voice has no repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo> = NOT_FOUND
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(33),
            },
        ]

        const actualIndividualSegnoTime: Ms = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(to.Ms(-1))
    })
})
