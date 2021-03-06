// tslint:disable no-type-definitions-outside-types-modules

import {
    ActionForState,
    Coordinate,
    Duration,
    Location,
    Maybe,
    Ms,
    Point,
    ThreeDimensional,
    TypedMap,
} from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { SampleDatas } from '../preparation'
import { PreparedVoice, Voice } from '../types'

enum StateKey {
    CLOCK = 'CLOCK',
    PAUSED = 'PAUSED',
    PREPARED_VOICES = 'PREPARED_VOICES',
    VOICES = 'VOICES',
    TOTAL_DURATION = 'TOTAL_DURATION',
    SEGNO_TIME = 'SEGNO_TIME',
    TIME = 'TIME',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    WEB_VR = 'WEB_VR',
    HOME_LOCATION = 'HOME_LOCATION',
    SAMPLE_DATA = 'SAMPLE_DATA',
    IMMERSIVE_AUDIO_ENABLED = 'IMMERSIVE_AUDIO_ENABLED',
    IMMERSIVE_AUDIO_ON = 'IMMERSIVE_AUDIO_ON',
}

interface State {
    [ StateKey.CLOCK ]: Maybe<Worker>,
    [ StateKey.PAUSED ]: boolean,
    [ StateKey.PREPARED_VOICES ]: PreparedVoice[],
    [ StateKey.VOICES ]: Voice[],
    [ StateKey.TOTAL_DURATION ]: Duration,
    [ StateKey.SEGNO_TIME ]: Point<Ms>,
    [ StateKey.TIME ]: Point<Ms>,
    [ StateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ StateKey.WEB_VR ]: Maybe<Vrb>,
    [ StateKey.HOME_LOCATION ]: Maybe<Coordinate<Location, ThreeDimensional>>,
    [ StateKey.SAMPLE_DATA ]: Maybe<SampleDatas>,
    [ StateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
    [ StateKey.IMMERSIVE_AUDIO_ON ]: boolean,
}

type ImmutableState = TypedMap<State>

type Action = ActionForState<State>

export {
    ImmutableState,
    StateKey,
    State,
    Action,
}
