import { Maybe } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { onClockMessage } from './onClockMessage'

const setupClock: () => Promise<void> =
    async (): Promise<void> => {
        const oldClock: Maybe<Worker> = store.getState()
            .get(StateKey.CLOCK)
        if (oldClock) {
            oldClock.terminate()
        }

        const clock: Worker = new Worker(new URL('./clock.worker', import.meta.url))
        clock.onmessage = onClockMessage

        store.dispatch({ type: StateKey.CLOCK, data: clock })
    }

export {
    setupClock,
}
