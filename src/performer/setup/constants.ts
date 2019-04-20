// tslint:disable no-magic-numbers

import { MILLISECONDS_PER_SECOND, Ms, notAs } from '@musical-patterns/utilities'

const TARGET_FPS: number = 120
const TIME_STEP: number = notAs.Cardinal<Ms>(MILLISECONDS_PER_SECOND) / TARGET_FPS

export {
    TIME_STEP,
}
