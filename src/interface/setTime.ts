import { Ms, Point } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action, store } from '../performer'
import { computeSetTimeActions, stopExistingVoices } from './helpers'

const setTime: (time: Point<Ms>) => Promise<void> =
    async (time: Point<Ms>): Promise<void> => {
        stopExistingVoices()

        const setTimeActions: Action[] = await computeSetTimeActions(time)
        store.dispatch(batchActions(setTimeActions))
    }

export {
    setTime,
}
