import { Duration, Ms, Point } from '@musical-patterns/utilities'

type OnUpdate = (timePosition: Point<Ms>) => void

interface ComputePatternTimeParameters {
    segnoTime: Point<Ms>,
    timePosition: Point<Ms>,
    totalDuration: Duration,
}

export {
    OnUpdate,
    ComputePatternTimeParameters,
}
