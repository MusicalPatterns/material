import { as, Duration, Ms, Point, use } from '@musical-patterns/utilities'
import { update } from '../performance'
import { ImmutableState, StateKey, store } from '../state'
import { PreparedVoice } from '../types'

const onClockMessage: (event: MessageEvent) => void =
    (event: MessageEvent): void => {
        const state: ImmutableState = store.getState()
        if (state.get(StateKey.PAUSED)) {
            return
        }

        const time: Point<Ms> = state.get(StateKey.TIME_POSITION)
        const clockTimeIncrement: Duration = as.Delta<Ms>(event.data)
        const newTime: Point<Ms> = use.Translation(time, clockTimeIncrement)
        store.dispatch({ type: StateKey.TIME_POSITION, data: newTime })

        const preparedVoices: PreparedVoice[] = state.get(StateKey.PREPARED_VOICES)
        preparedVoices.forEach((preparedVoice: PreparedVoice): void => {
            update(preparedVoice, newTime)
        })
    }

export {
    onClockMessage,
}
