import { as, Ms, musicalAs, NOT_FOUND, Ordinal, Point } from '@musical-patterns/utilities'
import { computeIndividualSegnoTime, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual segno time', (): void => {
    it('sums the durations of the sections leading up to the repetend', (): void => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = as.Ordinal<SectionInfo[]>(2)
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(33),
            },
            {
                doesRepeatForever: true,
                totalDuration: musicalAs.Duration(4236),
            },
        ]

        const actualIndividualSegnoTime: Point<Ms> = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(as.Point<Ms>(132))
    })

    it('gives -1 if voice has no repetend', (): void => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = NOT_FOUND
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(99),
            },
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(33),
            },
        ]

        const actualIndividualSegnoTime: Point<Ms> = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })

        expect(actualIndividualSegnoTime)
            .toEqual(as.Point<Ms>(-1))
    })
})
