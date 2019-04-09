import { BatchAction, batchActions } from 'redux-batched-actions'
import { compilePattern, CompilePatternParameters } from '../compiler'
import { PreparedVoice, prepareVoices, StateKey, store } from '../performer'
import { stopExistingVoices } from './helpers'

const setPattern: (pattern: CompilePatternParameters) => Promise<void> =
    async (pattern: CompilePatternParameters): Promise<void> => {
        const { voices, segnoTime, totalDuration } = await compilePattern(pattern)

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
