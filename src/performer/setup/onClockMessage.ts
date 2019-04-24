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

        const timePosition: Point<Ms> = state.get(StateKey.TIME_POSITION)
        const clockTimeIncrement: Duration = as.Translation<Point<Ms>>(event.data)
        const newTimePosition: Point<Ms> = use.Translation(timePosition, clockTimeIncrement)
        store.dispatch({ type: StateKey.TIME_POSITION, data: newTimePosition })

        const preparedVoices: PreparedVoice[] = state.get(StateKey.PREPARED_VOICES)
        preparedVoices.forEach((preparedVoice: PreparedVoice): void => {
            update(preparedVoice, newTimePosition)
        })
    }

export {
    onClockMessage,
}
