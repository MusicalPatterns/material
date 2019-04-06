import { computeReducer } from '@musical-patterns/utilities'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { BatchAction, batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { initialState } from './initials'
import { Action, ImmutableState } from './types'

// @ts-ignore
// tslint:disable:next-line no-any
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<ImmutableState, Action | BatchAction> = createStore(
    enableBatching(computeReducer({ initialState })),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
}
