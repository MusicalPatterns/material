import { from, Maybe, Scalar } from '@musical-patterns/utilities'
import { PositionalAudio } from 'three'
import { context } from './context'
import { SourceNode } from './source'
import { ComputeGainNodeParameters } from './types'

const computeGainNode: (parameters: {
    gain: Scalar,
    positionalAudio: Maybe<PositionalAudio>,
    sourceNode: SourceNode,
}) => GainNode =
    ({ sourceNode, positionalAudio, gain }: ComputeGainNodeParameters): GainNode => {
        let gainNode: GainNode
        if (positionalAudio) {
            gainNode = positionalAudio.getOutput()
            positionalAudio.setVolume(from.Scalar(gain))
        }
        else {
            gainNode = context.createGain()
            sourceNode.connect(gainNode)
            gainNode.connect(context.destination)
            gainNode.gain.value = from.Scalar(gain)
        }

        return gainNode
    }

export {
    computeGainNode,
}
