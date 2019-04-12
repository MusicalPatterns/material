import { apply, difference, from, Index, Ms, sum, to } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../performance'
import { ComputePatternTimeParameters } from './types'

const computePatternTime: (parameters: {
    segnoTime: Ms,
    timePosition: Ms,
    totalDuration: Ms,
}) => Ms =
    ({ timePosition, totalDuration, segnoTime }: ComputePatternTimeParameters): Ms => {
        const repetendDuration: Ms = from.Translation(difference(totalDuration, segnoTime))

        if (timePosition < totalDuration) {
            return timePosition
        }

        if (segnoTime === NON_SEGNO_TIME) {
            return totalDuration
        }

        const introDuration: Ms = from.Translation(difference(totalDuration, repetendDuration))
        const timeWithinRepetend: Ms = apply.Modulus(
            from.Translation(difference(timePosition, introDuration)),
            to.Modulus(repetendDuration),
        )

        return to.Ms(sum(
            introDuration,
            timeWithinRepetend,
        ))
    }

export {
    computePatternTime,
}
