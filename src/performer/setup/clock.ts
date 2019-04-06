import { Maybe } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { onClockMessage } from './onClockMessage'

const setupClock: VoidFunction =
    (): void => {
        const oldClock: Maybe<Worker> = store.getState()
            .get(StateKey.CLOCK)
        if (oldClock) {
            oldClock.terminate()
        }

        // @ts-ignore
        // tslint:disable-next-line
        const Clock = require('./clock.worker')
        const clock: Worker = new Clock()
        clock.onmessage = onClockMessage

        store.dispatch({ type: StateKey.CLOCK, data: clock })
    }

export {
    setupClock,
}
