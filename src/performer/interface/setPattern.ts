import { BatchAction, batchActions } from 'redux-batched-actions'
import { prepareVoices } from '../preparation'
import { StateKey, store } from '../state'
import { PreparedVoice } from '../types'
import { stopExistingVoices } from './helpers'
import { CompiledPattern } from './types'

const setPattern: (compiledPattern: CompiledPattern) => Promise<void> =
    async ({ voices, segnoTime, totalDuration }: CompiledPattern): Promise<void> => {
        stopExistingVoices()

        const preparedVoices: PreparedVoice[] = await prepareVoices(voices)

        const batchedAction: BatchAction = batchActions([
            { type: StateKey.VOICES, data: voices },
            { type: StateKey.TOTAL_DURATION, data: totalDuration },
            { type: StateKey.SEGNO_TIME, data: segnoTime },
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
        ])
        store.dispatch(batchedAction)
    }

export {
    setPattern,
}
