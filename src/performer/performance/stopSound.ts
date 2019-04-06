import { SourceNode } from './source'
import { ComputeStopSoundParameters, StartedSound, StopSound } from './types'

const stopSourceNode: (sourceNode: SourceNode) => void =
    (sourceNode: SourceNode): void => {
        try {
            sourceNode.stop()
            sourceNode.disconnect()
        }
            // tslint:disable-next-line no-empty
        catch (e) {}
    }

const computeStopSound: (parameters: { startedSound: StartedSound }) => StopSound =
    ({ startedSound }: ComputeStopSoundParameters): StopSound =>
        (): void => {
            const { sourceNode, gainNode, positionalAudio, positionNode } = startedSound
            if (positionNode && positionalAudio) {
                positionNode.remove(positionalAudio)
            }

            if (sourceNode) {
                stopSourceNode(sourceNode)
            }
            if (gainNode) {
                gainNode.disconnect()
            }
        }

export {
    computeStopSound,
}
