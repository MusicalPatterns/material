import { BEGINNING, Index, Ms, to } from '@musical-patterns/utilities'
import { computePatternTime, NON_SEGNO_TIME } from '../../../../src/indexForTest'

describe('pattern time', () => {
    it('keeps repeating from the segno time', () => {
        const segnoTime: Ms = to.Ms(5)
        const totalDuration: Ms = to.Ms(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(5),
            totalDuration,
        }))
            .toBe(to.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(9),
            totalDuration,
        }))
            .toBe(to.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(10),
            totalDuration,
        }))
            .toBe(to.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(14),
            totalDuration,
        }))
            .toBe(to.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(20),
            totalDuration,
        }))
            .toBe(to.Ms(5))
    })

    it('when segno time is -1 (has no repetend), time sticks at the end', () => {
        const segnoTime: Ms = NON_SEGNO_TIME
        const totalDuration: Ms = to.Ms(10)
        expect(computePatternTime({
            segnoTime,
            timePosition: BEGINNING,
            totalDuration,
        }))
            .toBe(BEGINNING)

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(5),
            totalDuration,
        }))
            .toBe(to.Ms(5))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(9),
            totalDuration,
        }))
            .toBe(to.Ms(9))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(10),
            totalDuration,
        }))
            .toBe(to.Ms(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(14),
            totalDuration,
        }))
            .toBe(to.Ms(10))

        expect(computePatternTime({
            segnoTime,
            timePosition: to.Ms(20),
            totalDuration,
        }))
            .toBe(to.Ms(10))
    })
})
