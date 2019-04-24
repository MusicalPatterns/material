import { Hz, keyExistsOnObject, Point } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { context } from '../context'
import { SourceType, Timbre } from '../types'
import {
    ComputeSourceNodeParameters,
    ImmersiveKey,
    PitchKey,
    PitchObject,
    SampleSourceNode,
    SetPitchObjectValueParameters,
    SourceNode,
    SourceNodeComputingKeys,
    StandardKey,
    TimbreSetterKey,
} from './types'

const isSampleSourceNode: (sourceNode: SourceNode) => sourceNode is SampleSourceNode =
    (sourceNode: SourceNode): sourceNode is SampleSourceNode =>
        keyExistsOnObject('buffer', sourceNode)

const setPitchObjectValue: (setupPitchObjectParameters: {
    computeSourceNodeParameters: ComputeSourceNodeParameters,
    pitchKey: PitchKey,
    sourceNode: SourceNode,
}) => void =
    ({ sourceNode, pitchKey, computeSourceNodeParameters }: SetPitchObjectValueParameters): void => {
        const pitchObject: PitchObject = sourceNode[ pitchKey ]
        pitchObject.value = computeSourceNodeParameters[ pitchKey ] as unknown as number || 1
    }

const computeSourceNode: (parameters: {
    frequency: Point<Hz>,
    immersiveAudioEnabled: boolean,
    playbackRate?: Point<Hz>,
    sourceType: SourceType,
    timbre: Timbre,
    webVr?: Vrb,
}) => SourceNode =
    (parameters: ComputeSourceNodeParameters): SourceNode => {
        const { timbre, sourceType, webVr, immersiveAudioEnabled } = parameters

        let sourceNodeComputingKeys: SourceNodeComputingKeys
        if (sourceType === SourceType.SAMPLE) {
            sourceNodeComputingKeys = {
                immersiveKey: ImmersiveKey.createSpatialBufferSource,
                pitchKey: PitchKey.playbackRate,
                standardKey: StandardKey.createBufferSource,
                timbreSetterKey: TimbreSetterKey.setBuffer,
            }
        }
        else {
            sourceNodeComputingKeys = {
                immersiveKey: ImmersiveKey.createSpatialOscillator,
                pitchKey: PitchKey.frequency,
                standardKey: StandardKey.createOscillator,
                timbreSetterKey: TimbreSetterKey.setPeriodicWave,
            }
        }
        const { timbreSetterKey, immersiveKey, standardKey, pitchKey } = sourceNodeComputingKeys

        // @ts-ignore
        const sourceNode: SourceNode = immersiveAudioEnabled && webVr ?
            webVr[ immersiveKey ]() :
            context[ standardKey ]()
        if (isSampleSourceNode(sourceNode)) {
            sourceNode.setBuffer = (buffer: Timbre): void => {
                sourceNode.buffer = buffer as AudioBuffer
            }
        }

        sourceNode[ timbreSetterKey ](timbre)

        setPitchObjectValue({ sourceNode, pitchKey, computeSourceNodeParameters: parameters })

        return sourceNode
    }

export {
    computeSourceNode,
}
