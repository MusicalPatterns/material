import { Ms, Point, Translation } from '@musical-patterns/utilities'

type OnUpdate = (timePosition: Point<Ms>) => void

interface ComputePatternTimeParameters {
    segnoTime: Point<Ms>,
    timePosition: Point<Ms>,
    totalDuration: Translation<Ms>,
}

export {
    OnUpdate,
    ComputePatternTimeParameters,
}
