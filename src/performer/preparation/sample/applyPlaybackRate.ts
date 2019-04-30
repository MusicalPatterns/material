import { Maybe } from '@musical-patterns/utilities'
import { StateKey, store } from '../../state'
import { Sound } from '../../types'
import { computePlaybackRate } from './playbackRate'
import { SampleDatas, SampleName } from './types'

const applyPlaybackRate: (sound: Sound, timbreName: SampleName) => Sound =
    (sound: Sound, timbreName: SampleName): Sound => {
        const outputSound: Sound = sound

        const sampleData: Maybe<SampleDatas> = store.getState()
            .get(StateKey.SAMPLE_DATA)

        if (sampleData) {
            sound.playbackRate = computePlaybackRate(sampleData[ timbreName ], sound.tone)
        }

        return outputSound
    }

export {
    applyPlaybackRate,
}
