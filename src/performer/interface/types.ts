import { Coordinate, Ms } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { OnUpdate } from '../setup'
import { Voice } from '../types'

interface ComputeToggleImmersiveAudioParameters {
    vrb: Vrb,
}

interface EnableImmersiveAudioParameters {
    homePosition?: Coordinate,
    onNoVr?: VoidFunction,
    onReady?: VoidFunction,
    vrb?: Vrb,
}

interface SetupPerformerParameters {
    compiledPattern?: CompiledPattern,
    onUpdate?: OnUpdate,
}

interface ToggleImmersiveAudioHandlers {
    enterImmersiveAudio: VoidFunction,
    exitImmersiveAudio: VoidFunction,
}

interface CompiledPattern {
    segnoTime: Ms,
    totalDuration: Ms,
    voices: Voice[],
}

export {
    ComputeToggleImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    SetupPerformerParameters,
    ToggleImmersiveAudioHandlers,
    CompiledPattern,
}
