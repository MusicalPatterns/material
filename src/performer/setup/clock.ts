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

        // @ts-ignore
        import('worker-loader!./clock.worker').then(
            Clock => {
                const clock: Worker = new Clock.default()
                clock.onmessage = onClockMessage

                store.dispatch({ type: StateKey.CLOCK, data: clock })
            },
            (error) => console.error("ERROR LOADING CLOCK WORKER: ", error)
        )
    }

export {
    setupClock,
}
