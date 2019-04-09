import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, StateKey, store } from '../performer'
import { computeSetTimeActions, stopExistingVoices } from './helpers'

const stop: () => Promise<void> =
    async (): Promise<void> => {
        stopExistingVoices()

        const setTimeActions: Action[] = await computeSetTimeActions(BEGINNING)
        const actions: Action[] = setTimeActions.concat([
            { type: StateKey.PAUSED, data: true },
        ])
        const batchedAction: BatchAction = batchActions(actions)
        store.dispatch(batchedAction)
    }

export {
    stop,
}
