import { Ms } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action, store } from '../performer'
import { computeSetTimeActions, stopExistingVoices } from './helpers'

const setTimePosition: (timePosition: Ms) => Promise<void> =
    async (timePosition: Ms): Promise<void> => {
        stopExistingVoices()

        const setTimeActions: Action[] = await computeSetTimeActions(timePosition)
        store.dispatch(batchActions(setTimeActions))
    }

export {
    setTimePosition,
}
