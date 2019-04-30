import { Ms, Point } from '@musical-patterns/utilities'
import { Action, PreparedVoice, prepareVoices, StateKey, store, Voice } from '../../performer'

const computeSetTimeActions: (time: Point<Ms>) => Promise<Action[]> =
    async (time: Point<Ms>): Promise<Action[]> => {
        const voices: Voice[] = store.getState()
            .get(StateKey.VOICES)
        const preparedVoices: PreparedVoice[] = await prepareVoices(voices, time)

        return [
            { type: StateKey.PREPARED_VOICES, data: preparedVoices },
            { type: StateKey.TIME, data: time },
        ]
    }

export {
    computeSetTimeActions,
}
