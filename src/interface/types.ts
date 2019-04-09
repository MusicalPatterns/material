import { Coordinate, Ms } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { CompilePatternParameters } from '../compiler'
import { OnUpdate, Voice } from '../performer'

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
    onUpdate?: OnUpdate,
    pattern?: CompilePatternParameters,
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
