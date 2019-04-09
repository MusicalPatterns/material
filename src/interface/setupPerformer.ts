import { noop } from '@musical-patterns/utilities'
import { CompilePatternParameters } from '../compiler'
import {
    activateContextInMobileBrowserEnvironments,
    computeSampleData,
    OnUpdate,
    setupClock,
    setupTimeControls,
} from '../performer'
import { play } from './play'
import { setPattern } from './setPattern'
import { SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: {
    onUpdate?: OnUpdate,
    pattern?: CompilePatternParameters,
}) => Promise<void> =
    async ({ onUpdate = noop, pattern }: SetupPerformerParameters = {}): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        computeSampleData()
        setupClock()

        if (pattern) {
            await setPattern(pattern)
            play()
        }
    }

export {
    setupPerformer,
}
