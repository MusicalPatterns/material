import { StateKey, store } from '../state'

const pause: VoidFunction =
    (): void => {
        store.dispatch({ type: StateKey.PAUSED, data: true })
    }

export {
    pause,
}
