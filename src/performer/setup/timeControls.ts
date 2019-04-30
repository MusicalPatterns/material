import { BEGINNING, Duration, Ms, Point } from '@musical-patterns/utilities'
import { ImmutableState, StateKey, store } from '../state'
import { computePatternTime } from './patternTime'
import { OnUpdate } from './types'

const setupTimeControls: (onUpdate: OnUpdate) => void =
    (onUpdate: OnUpdate): void => {
        let previousTime: Point<Ms> = BEGINNING
        store.subscribe((): void => {
            const state: ImmutableState = store.getState()
            const time: Point<Ms> = state
                .get(StateKey.TIME)
            const totalDuration: Duration = state
                .get(StateKey.TOTAL_DURATION)
            const segnoTime: Point<Ms> = state
                .get(StateKey.SEGNO_TIME)

            if (time !== previousTime) {
                onUpdate(computePatternTime({ time, totalDuration, segnoTime }))
                previousTime = time
            }
        })
    }

export {
    setupTimeControls,
}
