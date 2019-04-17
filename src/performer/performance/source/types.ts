import { Hz, Maybe, ObjectOf, Scalar } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SourceType, Timbre } from '../types'

// tslint:disable-next-line no-any
interface ComputeSourceNodeParameters extends ObjectOf<any> {
    frequency: Hz,
    immersiveAudioEnabled: boolean,
    playbackRate?: Maybe<Scalar<Hz>>,
    sourceType: SourceType,
    timbre: Timbre,
    webVr?: Vrb,
}

type SourceNode = SampleSourceNode | OscillatorSourceNode

type SampleSourceNode = AudioBufferSourceNode & TimbreSetterKeyIndexSignature & PitchKeyIndexSignature
type OscillatorSourceNode = OscillatorNode & TimbreSetterKeyIndexSignature & PitchKeyIndexSignature

type PitchKeyIndexSignature = {
    [Ordinal in PitchKey]: PitchObject
}

type TimbreSetterKeyIndexSignature = {
    [Ordinal in TimbreSetterKey]: TimbreSetter
}

interface PitchObject {
    value: number,
}

type TimbreSetter = (timbre: Timbre) => void

interface SourceNodeComputingKeys {
    immersiveKey: ImmersiveKey,
    pitchKey: PitchKey,
    standardKey: StandardKey,
    timbreSetterKey: TimbreSetterKey,
}

enum ImmersiveKey {
    createSpatialBufferSource = 'createSpatialBufferSource',
    createSpatialOscillator = 'createSpatialOscillator',
}

enum PitchKey {
    frequency = 'frequency',
    playbackRate = 'playbackRate',
}

enum StandardKey {
    createBufferSource = 'createBufferSource',
    createOscillator = 'createOscillator',
}

enum TimbreSetterKey {
    setPeriodicWave = 'setPeriodicWave',
    setBuffer = 'setBuffer',
}

interface SetPitchObjectValueParameters {
    computeSourceNodeParameters: ComputeSourceNodeParameters,
    pitchKey: PitchKey,
    sourceNode: SourceNode,
}

export {
    ComputeSourceNodeParameters,
    SourceNode,
    PitchObject,
    TimbreSetter,
    SourceNodeComputingKeys,
    ImmersiveKey,
    PitchKey,
    PitchKeyIndexSignature,
    StandardKey,
    TimbreSetterKey,
    TimbreSetterKeyIndexSignature,
    SampleSourceNode,
    OscillatorSourceNode,
    SetPitchObjectValueParameters,
}
