import { as, difference, Duration, Ms, ofNotAs, Point, sum, use } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../performance'
import { ComputePatternTimeParameters } from './types'

const computePatternTime: (parameters: {
    segnoTime: Point<Ms>,
    timePosition: Point<Ms>,
    totalDuration: Duration,
}) => Point<Ms> =
    ({ timePosition, totalDuration, segnoTime }: ComputePatternTimeParameters): Point<Ms> => {
        const repetendDuration: Duration = difference(totalDuration, as.Translation(ofNotAs(segnoTime)))

        if (as.number(timePosition) < as.number(totalDuration)) {
            return timePosition
        }

        if (segnoTime === NON_SEGNO_TIME) {
            return as.Point<Ms>(as.number(totalDuration))
        }

        const introDuration: Duration = difference(totalDuration, repetendDuration)
        const timeWithinRepetend: Duration = use.Modulus(
            difference(as.Delta<Ms>(as.number(timePosition)), introDuration),
            as.Modulus(ofNotAs(repetendDuration)),
        )

        return as.Point<Ms>(as.number(sum(
            introDuration,
            timeWithinRepetend,
        )))
    }

export {
    computePatternTime,
}
