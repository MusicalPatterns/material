import { StateKey, store } from '../state'

const play: VoidFunction =
    (): void => {
        store.dispatch({ type: StateKey.PAUSED, data: false })
    }

export {
    play,
}
