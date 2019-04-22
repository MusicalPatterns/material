import { as, Ms, NOT_FOUND, Ordinal } from '@musical-patterns/utilities'
import { computeIndividualSegnoTime, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual segno time', () => {
    it('sums the durations of the sections leading up to the repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(33),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Ms(4236),
            },
        ]

        const actualIndividualSegnoTime: Ms = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(as.Ms(132))
    })

    it('gives -1 if voice has no repetend', () => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = NOT_FOUND
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(33),
            },
        ]

        const actualIndividualSegnoTime: Ms = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(as.Ms(-1))
    })
})
