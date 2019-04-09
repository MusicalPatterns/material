import { StateKey, store } from '../performer'

const play: VoidFunction =
    (): void => {
        store.dispatch({ type: StateKey.PAUSED, data: false })
    }

export {
    play,
}
