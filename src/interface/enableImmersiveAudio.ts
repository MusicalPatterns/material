import { Coordinate, noop } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildVrb, Vrb } from 'vrb'
import { StateKey, store } from '../performer'
import { handleImmersiveAudioChange } from './helpers'
import {
    ComputeToggleImmersiveAudioParameters,
    EnableImmersiveAudioParameters,
    ToggleImmersiveAudioHandlers,
} from './types'

const computeToggleImmersiveAudio: ({ vrb }: { vrb: Vrb }) => {
    enterImmersiveAudio: VoidFunction,
    exitImmersiveAudio: VoidFunction,
} =
    ({ vrb }: ComputeToggleImmersiveAudioParameters): ToggleImmersiveAudioHandlers => ({
        enterImmersiveAudio: async (): Promise<void> => {
            await vrb.toggleVr()
            const immersiveAudioReady: boolean = store.getState()
                .get(StateKey.IMMERSIVE_AUDIO_READY)
            if (!immersiveAudioReady) {
                return
            }

            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_ENABLED, data: true })
        },
        exitImmersiveAudio: async (): Promise<void> => {
            await vrb.toggleVr()
            const immersiveAudioReady: boolean = store.getState()
                .get(StateKey.IMMERSIVE_AUDIO_READY)
            if (!immersiveAudioReady) {
                return
            }

            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_ENABLED, data: false })
        },
    })

const enableImmersiveAudio: (enableImmersiveAudioParameters?: {
    homeLocation?: Coordinate,
    onNoVr?: VoidFunction,
    onReady?: VoidFunction,
    vrb?: Vrb,
}) => {
    enterImmersiveAudio: VoidFunction,
    exitImmersiveAudio: VoidFunction,
} =
    (enableImmersiveAudioParameters: EnableImmersiveAudioParameters = {}): ToggleImmersiveAudioHandlers => {
        const { homeLocation, vrb, onReady = noop, onNoVr = noop } = enableImmersiveAudioParameters
        let webVr: Vrb
        if (vrb) {
            webVr = vrb
            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_READY, data: true })
        }
        else {
            webVr = buildVrb({
                camerasConfig: { INITIAL_PERSPECTIVE_POSITION: [ 0, 0, 0 ] },
                onNoVr,
                onReady,
            })
            store.dispatch({ type: StateKey.IMMERSIVE_AUDIO_READY, data: true })
        }

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.WEB_VR, data: webVr },
            { type: StateKey.HOME_LOCATION, data: homeLocation },
        ])
        store.dispatch(batchedAction)

        store.subscribe(handleImmersiveAudioChange)

        return computeToggleImmersiveAudio({ vrb: webVr })
    }

export {
    enableImmersiveAudio,
}
