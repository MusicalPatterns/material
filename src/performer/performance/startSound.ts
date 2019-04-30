import { Object3D } from 'three'
import { Vrb } from 'vrb'
import { computeGainNode } from './gainNodes'
import { computePositionalAudio } from './positionalAudio'
import { computeSourceNode, SourceNode } from './source'
import {
    ComputeStartSoundParameters,
    SoundToPlay,
    SourceType,
    StartedSound,
    StartSound,
    StartSoundAndStartedSound,
    Timbre,
} from './types'

const computeStartSound: (parameters: {
    immersiveAudioEnabled: boolean,
    sourceType: SourceType,
    timbre: Timbre,
    webVr?: Vrb,
}) => StartSoundAndStartedSound =
    ({ timbre, webVr, sourceType, immersiveAudioEnabled }: ComputeStartSoundParameters): StartSoundAndStartedSound => {
        const startedSound: StartedSound = {}

        const startSound: StartSound = ({ gain, tone, playbackRate, location }: SoundToPlay): void => {
            const sourceNode: SourceNode = computeSourceNode({
                immersiveAudioEnabled,
                playbackRate,
                sourceType,
                timbre,
                tone,
                webVr,
            })
            startedSound.sourceNode = sourceNode
            if (immersiveAudioEnabled && webVr) {
                const positionNode: Object3D = new Object3D()
                startedSound.positionNode = positionNode
                startedSound.positionalAudio = computePositionalAudio({ location, positionNode, sourceNode, webVr })
            }
            startedSound.gainNode = computeGainNode({ gain, sourceNode, positionalAudio: startedSound.positionalAudio })
            startedSound.sourceNode.start()
        }

        return {
            startSound,
            startedSound,
        }
    }

export {
    computeStartSound,
}
