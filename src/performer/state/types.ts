// tslint:disable no-type-definitions-outside-types-modules

import {
    ActionForState,
    Coordinate,
    Maybe,
    Meters,
    Ms,
    Point,
    ThreeDimensional,
    Translation,
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
    TIME_POSITION = 'TIME_POSITION',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    WEB_VR = 'WEB_VR',
    HOME_POSITION = 'HOME_POSITION',
    SAMPLE_DATA = 'SAMPLE_DATA',
    IMMERSIVE_AUDIO_ENABLED = 'IMMERSIVE_AUDIO_ENABLED',
    IMMERSIVE_AUDIO_ON = 'IMMERSIVE_AUDIO_ON',
}

interface State {
    [ StateKey.CLOCK ]: Maybe<Worker>,
    [ StateKey.PAUSED ]: boolean,
    [ StateKey.PREPARED_VOICES ]: PreparedVoice[],
    [ StateKey.VOICES ]: Voice[],
    [ StateKey.TOTAL_DURATION ]: Translation<Ms>,
    [ StateKey.SEGNO_TIME ]: Point<Ms>,
    [ StateKey.TIME_POSITION ]: Point<Ms>,
    [ StateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ StateKey.WEB_VR ]: Maybe<Vrb>,
    [ StateKey.HOME_POSITION ]: Maybe<Coordinate<Meters, ThreeDimensional>>,
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
