import { StateKey, store } from '../performer'

const pause: VoidFunction =
    (): void => {
        store.dispatch({ type: StateKey.PAUSED, data: true })
    }

export {
    pause,
}
