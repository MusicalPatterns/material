import { BatchAction, batchActions } from 'redux-batched-actions'
import { ImmutableState, PreparedVoice, prepareVoices, StateKey, store, Voice } from '../../performer'
import { stopExistingVoices } from './stopExistingVoices'

const handleImmersiveAudioChange: () => Promise<void> =
    async (): Promise<void> => {
        const state: ImmutableState = store.getState()
        const immersiveAudioEnabled: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ENABLED)
        const immersiveAudioOn: boolean = state.get(StateKey.IMMERSIVE_AUDIO_ON)

        if (immersiveAudioEnabled !== immersiveAudioOn) {
            stopExistingVoices()

            const voices: Voice[] = state.get(StateKey.VOICES)
            const preparedVoices: PreparedVoice[] = await prepareVoices(voices)

            const batchedAction: BatchAction = batchActions([
                { type: StateKey.IMMERSIVE_AUDIO_ON, data: immersiveAudioEnabled },
                { type: StateKey.PREPARED_VOICES, data: preparedVoices },
            ])
            store.dispatch(batchedAction)
        }
    }

export {
    handleImmersiveAudioChange,
}
