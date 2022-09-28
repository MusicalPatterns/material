import { Maybe } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { onClockMessage } from './onClockMessage'
import Clock from './clock.worker'

const setupClock: () => Promise<void> =
    async (): Promise<void> => {
        const oldClock: Maybe<Worker> = store.getState()
            .get(StateKey.CLOCK)
        if (oldClock) {
            oldClock.terminate()
        }

        // @ts-ignore
        const clock: Worker = new Clock()
        clock.onmessage = onClockMessage

        store.dispatch({ type: StateKey.CLOCK, data: clock })
    }

export {
    setupClock,
}
