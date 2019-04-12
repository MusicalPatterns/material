import { Index, Ms, to } from '@musical-patterns/utilities'
import { computeIndividualSegnoTime, NON_SEGNO_INDEX, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual segno time', () => {
    it('sums the durations of the sections leading up to the repetend', () => {
        const individualRepetendIndex: Index = to.Index(2)
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
        const individualRepetendIndex: Index = NON_SEGNO_INDEX
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
