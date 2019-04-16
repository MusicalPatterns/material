import { Ms } from '@musical-patterns/utilities'

type OnUpdate = (timePosition: Ms) => void

interface ComputePatternTimeParameters {
    segnoTime: Ms,
    timePosition: Ms,
    totalDuration: Ms,
}

export {
    OnUpdate,
    ComputePatternTimeParameters,
}
