import { Ms } from '@musical-patterns/utilities'
import { Action, PreparedVoice, prepareVoices, StateKey, store, Voice } from '../../performer'

const computeSetTimeActions: (timePosition: Ms) => Promise<Action[]> =
    async (timePosition: Ms): Promise<Action[]> => {
        const voices: Voice[] = store.getState()
            .get(StateKey.VOICES)
        const preparedVoices: PreparedVoice[] = await prepareVoices(voices, timePosition)

        return [
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
            { type: StateKey.TIME_POSITION, data: timePosition },
        ]
    }

export {
    computeSetTimeActions,
}
