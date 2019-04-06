import { Maybe } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { computeStartSound, computeStopSound, StopSound, Timbre } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { Source } from '../types'
import { computePeriodicWave } from './oscillator'
import { getBuffer } from './sample'
import { sourceRequestIsSampleSourceRequest } from './typeGuards'
import { SourceRequest } from './types'

const getSource: (sourceRequest: SourceRequest) => Promise<Source> =
    async (sourceRequest: SourceRequest): Promise<Source> => {
        const timbre: Maybe<Timbre> = sourceRequestIsSampleSourceRequest(sourceRequest) ?
            await getBuffer(sourceRequest.timbreName) :
            computePeriodicWave(sourceRequest.timbreName)

        const { sourceType } = sourceRequest

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)

        const { startSound, startedSound } = computeStartSound({ timbre, webVr, immersiveAudioEnabled, sourceType })
        const stopSound: StopSound = computeStopSound({ startedSound })

        return { startSound, stopSound }
    }

export {
    getSource,
}
