// tslint:disable
// @ts-ignore
import * as requestAnimationFrame from 'raf'
import { TIME_STEP } from './constants'

const worker: Worker = self as unknown as Worker

let previousTimestamp: number
let delta: number = 0

const mainLoop: (timestamp: number) => void =
    (timestamp: number): void => {
        if (previousTimestamp) {
            delta += timestamp - previousTimestamp
        }

        while (delta >= TIME_STEP) {
            process.env.NODE_ENV == "test" ?
                // @ts-ignore
                worker.postMessage(TIME_STEP, "*") :
                worker.postMessage(TIME_STEP)
            delta -= TIME_STEP
        }

        previousTimestamp = timestamp
        requestAnimationFrame(mainLoop)
    }

requestAnimationFrame(mainLoop)

export default ((): void => undefined) as unknown
