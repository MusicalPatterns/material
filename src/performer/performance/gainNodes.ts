import { Amplitude, from, Maybe, Scalar } from '@musical-patterns/utilities'
import { PositionalAudio } from 'three'
import { context } from './context'
import { SourceNode } from './source'
import { ComputeGainNodeParameters } from './types'

const computeGainNode: (parameters: {
    gain: Scalar<Amplitude>,
    positionalAudio: Maybe<PositionalAudio>,
    sourceNode: SourceNode,
}) => GainNode =
    ({ sourceNode, positionalAudio, gain }: ComputeGainNodeParameters): GainNode => {
        let gainNode: GainNode
        if (positionalAudio) {
            gainNode = positionalAudio.getOutput()
            positionalAudio.setVolume(from.Scalar<Amplitude>(gain))
        }
        else {
            gainNode = context.createGain()
            sourceNode.connect(gainNode)
            gainNode.connect(context.destination)
            gainNode.gain.value = from.Scalar<Amplitude>(gain)
        }

        return gainNode
    }

export {
    computeGainNode,
}
