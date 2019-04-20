import { as, Ms, Translation, use } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { PreparedVoice } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState()
        if (state.get(StateKey.PAUSED)) {
            return
        }

        const timePosition: Ms = state.get(StateKey.TIME_POSITION)
        const clockTimeIncrement: Translation<Ms> = as.Translation<Ms>(event.data)
        const newTimePosition: Ms = use.Translation(timePosition, clockTimeIncrement)
        store.dispatch({ type: StateKey.TIME_POSITION, data: newTimePosition })

        const preparedVoices: PreparedVoice[] = state.get(StateKey.PREPARED_VOICES)
        preparedVoices.forEach((preparedVoice: PreparedVoice): void => {
            update(preparedVoice, newTimePosition)
        })
    }

export {
    onClockMessage,
}
