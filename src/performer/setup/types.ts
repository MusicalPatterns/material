import { Duration, Ms, Point } from '@musical-patterns/utilities'

type OnUpdate = (time: Point<Ms>) => void

interface ComputePatternTimeParameters {
    segnoTime: Point<Ms>,
    time: Point<Ms>,
    totalDuration: Duration,
}

export {
    OnUpdate,
    ComputePatternTimeParameters,
}
