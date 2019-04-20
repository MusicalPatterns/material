import { as, difference, Ms, ofNotAs, sum, use } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../performance'
import { ComputePatternTimeParameters } from './types'

const computePatternTime: (parameters: {
    segnoTime: Ms,
    timePosition: Ms,
    totalDuration: Ms,
}) => Ms =
    ({ timePosition, totalDuration, segnoTime }: ComputePatternTimeParameters): Ms => {
        const repetendDuration: Ms = difference(totalDuration, segnoTime)

        if (timePosition < totalDuration) {
            return timePosition
        }

        if (segnoTime === NON_SEGNO_TIME) {
            return totalDuration
        }

        const introDuration: Ms = difference(totalDuration, repetendDuration)
        const timeWithinRepetend: Ms = use.Modulus(
            difference(timePosition, introDuration),
            as.Modulus(ofNotAs(repetendDuration)),
        )

        return sum(
            introDuration,
            timeWithinRepetend,
        )
    }

export {
    computePatternTime,
}
