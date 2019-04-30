import { BEGINNING, NO_DURATION, typedMap } from '@musical-patterns/utilities'
import { ImmutableState, State, StateKey } from './types'

const initialState: ImmutableState = typedMap<State>({
    [ StateKey.CLOCK ]: undefined,
    [ StateKey.PAUSED ]: true,
    [ StateKey.PREPARED_VOICES ]: [],
    [ StateKey.VOICES ]: [],
    [ StateKey.TIME_POSITION ]: BEGINNING,
    [ StateKey.TOTAL_DURATION ]: NO_DURATION,
    [ StateKey.SEGNO_TIME ]: BEGINNING,
    [ StateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ StateKey.WEB_VR ]: undefined,
    [ StateKey.HOME_LOCATION ]: undefined,
    [ StateKey.SAMPLE_DATA ]: undefined,
    [ StateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ StateKey.IMMERSIVE_AUDIO_ON ]: false,
})

export {
    initialState,
}
