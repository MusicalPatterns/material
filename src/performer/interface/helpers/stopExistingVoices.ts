import { StateKey, store } from '../../state'
import { PreparedVoice } from '../../types'

const stopExistingVoices: () => void =
    (): void => {
        const preparedVoices: PreparedVoice[] = store.getState()
            .get(StateKey.PREPARED_VOICES)
        preparedVoices.forEach((preparedVoice: PreparedVoice): void => {
            preparedVoice.source.stopSound()
        })
    }

export {
    stopExistingVoices,
}
