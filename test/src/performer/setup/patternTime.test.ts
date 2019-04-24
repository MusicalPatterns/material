import { as, BEGINNING, Ms, Point, Translation } from '@musical-patterns/utilities'
import { computePatternTime, NON_SEGNO_TIME } from '../../../../src/indexForTest'

describe('pattern time', () => {
    it('keeps repeating from the segno time', () => {
        const segnoTime: Point<Ms> = as.Point<Ms>(5)
        const totalDuration: Translation<Ms> = as.Translation<Ms>(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(5),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(9),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(10),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(14),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(20),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(5))
    })

    it('when segno time is -1 (has no repetend), time sticks at the end', () => {
        const segnoTime: Point<Ms> = NON_SEGNO_TIME
        const totalDuration: Translation<Ms> = as.Translation<Ms>(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(5),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(9),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(10),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(14),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Point<Ms>(20),
            totalDuration,
        }))
            .toBe(as.Point<Ms>(10))
    })
})
