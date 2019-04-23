import { BEGINNING, Ms, Point, Translation } from '@musical-patterns/utilities'
import { ImmutableState, StateKey, store } from '../state'
import { computePatternTime } from './patternTime'
import { OnUpdate } from './types'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTimePosition: Point<Ms> = BEGINNING
        store.subscribe((): void => {
            const state: ImmutableState = store.getState()
            const timePosition: Point<Ms> = state
                .get(StateKey.TIME_POSITION)
            const totalDuration: Translation<Ms> = state
                .get(StateKey.TOTAL_DURATION)
            const segnoTime: Point<Ms> = state
                .get(StateKey.SEGNO_TIME)

            if (timePosition !== previousTimePosition) {
                onUpdate(computePatternTime({ timePosition, totalDuration, segnoTime }))
                previousTimePosition = timePosition
            }
        })
    }

export {
    setupTimeControls,
}
