import { as, difference, Ms, notAs, ofNotAs, Point, sum, Translation, use } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../performance'
import { ComputePatternTimeParameters } from './types'

const computePatternTime: (parameters: {
    segnoTime: Point<Ms>,
    timePosition: Point<Ms>,
    totalDuration: Translation<Ms>,
}) => Point<Ms> =
    ({ timePosition, totalDuration, segnoTime }: ComputePatternTimeParameters): Point<Ms> => {
        const repetendDuration: Translation<Ms> = difference(totalDuration, as.Translation<Ms>(notAs.Point(segnoTime)))

        if (notAs.Point(timePosition) < notAs.Translation(totalDuration)) {
            return timePosition
        }

        if (segnoTime === NON_SEGNO_TIME) {
            return as.Point<Ms>(notAs.Translation(totalDuration))
        }

        const introDuration: Translation<Ms> = difference(totalDuration, repetendDuration)
        const timeWithinRepetend: Translation<Ms> = use.Modulus(
            difference(as.Translation<Ms>(notAs.Point(timePosition)), introDuration),
            as.Modulus(ofNotAs(repetendDuration)),
        )

        return as.Point<Ms>(notAs.Translation(sum(
            introDuration,
            timeWithinRepetend,
        )))
    }

export {
    computePatternTime,
}
