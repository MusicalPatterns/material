import { as, BEGINNING, Ms } from '@musical-patterns/utilities'
import { computePatternTime, NON_SEGNO_TIME } from '../../../../src/indexForTest'

describe('pattern time', () => {
    it('keeps repeating from the segno time', () => {
        const segnoTime: Ms = as.Ms(5)
        const totalDuration: Ms = as.Ms(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(5),
            totalDuration,
        }))
            .toBe(as.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(9),
            totalDuration,
        }))
            .toBe(as.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(10),
            totalDuration,
        }))
            .toBe(as.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(14),
            totalDuration,
        }))
            .toBe(as.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(20),
            totalDuration,
        }))
            .toBe(as.Ms(5))
    })

    it('when segno time is -1 (has no repetend), time sticks at the end', () => {
        const segnoTime: Ms = NON_SEGNO_TIME
        const totalDuration: Ms = as.Ms(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(5),
            totalDuration,
        }))
            .toBe(as.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(9),
            totalDuration,
        }))
            .toBe(as.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(10),
            totalDuration,
        }))
            .toBe(as.Ms(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(14),
            totalDuration,
        }))
            .toBe(as.Ms(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: as.Ms(20),
            totalDuration,
        }))
            .toBe(as.Ms(10))
    })
})
