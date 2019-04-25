import { as, Gain, Maybe } from '@musical-patterns/utilities'
import { PositionalAudio } from 'three'
import { context } from './context'
import { SourceNode } from './source'
import { ComputeGainNodeParameters } from './types'

const computeGainNode: (parameters: {
    gain: Gain,
    positionalAudio: Maybe<PositionalAudio>,
    sourceNode: SourceNode,
}) => GainNode =
    ({ sourceNode, positionalAudio, gain }: ComputeGainNodeParameters): GainNode => {
        let gainNode: GainNode
        if (positionalAudio) {
            gainNode = positionalAudio.getOutput()
            positionalAudio.setVolume(as.number(gain))
        }
        else {
            gainNode = context.createGain()
            sourceNode.connect(gainNode)
            gainNode.connect(context.destination)
            gainNode.gain.value = as.number(gain)
        }

        return gainNode
    }

export {
    computeGainNode,
}
