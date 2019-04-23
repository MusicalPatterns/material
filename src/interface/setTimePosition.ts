import { Ms, Point } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action, store } from '../performer'
import { computeSetTimeActions, stopExistingVoices } from './helpers'

const setTimePosition: (timePosition: Point<Ms>) => Promise<void> =
    async (timePosition: Point<Ms>): Promise<void> => {
        stopExistingVoices()

        const setTimeActions: Action[] = await computeSetTimeActions(timePosition)
        store.dispatch(batchActions(setTimeActions))
    }

export {
    setTimePosition,
}
