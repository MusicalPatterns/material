import { Amplitude, Coordinate, Hz, Maybe, Meters, Scalar } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { SourceNode } from './source'

interface SoundToPlay {
    frequency: Hz,
    gain: Scalar<Amplitude>,
    playbackRate?: Scalar<Hz>,
    position: Coordinate<Meters>,
}

type StartSound = (sound: SoundToPlay) => void

type StopSound = VoidFunction

interface StartSoundAnd {
    startSound: StartSound,
}

interface ComputeStartSoundParameters {
    immersiveAudioEnabled: boolean,
    sourceType: SourceType,
    timbre: Timbre,
    webVr?: Vrb,
}

interface StartSoundAndStartedSound extends StartSoundAnd {
    startedSound: StartedSound
}

interface StartedSound {
    gainNode?: GainNode,
    positionalAudio?: PositionalAudio,
    positionNode?: Object3D,
    sourceNode?: SourceNode,
}

interface ComputeStopSoundParameters {
    startedSound: StartedSound,
}

interface ComputeGainNodeParameters {
    gain: Scalar,
    positionalAudio: Maybe<PositionalAudio>,
    sourceNode: SourceNode,
}

interface ComputePositionalAudioParameters {
    position: Coordinate<Meters>,
    positionNode: Object3D,
    sourceNode: SourceNode,
    webVr: Vrb,
}

enum SourceType {
    OSCILLATOR = 'OSCILLATOR',
    SAMPLE = 'SAMPLE',
}

type Timbre = AudioBuffer | PeriodicWave

export {
    SoundToPlay,
    StartSound,
    StopSound,
    ComputeStartSoundParameters,
    StartSoundAndStartedSound,
    StartedSound,
    ComputeStopSoundParameters,
    ComputeGainNodeParameters,
    ComputePositionalAudioParameters,
    Timbre,
    SourceType,
}
