import { Maybe, noop } from '@musical-patterns/utilities'
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
import { CompiledPattern, SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: {
    onUpdate?: OnUpdate,
    pattern?: CompilePatternParameters,
}) => Promise<Maybe<CompiledPattern>> =
    async ({ onUpdate = noop, pattern }: SetupPerformerParameters = {}): Promise<Maybe<CompiledPattern>> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        computeSampleData()
        setupClock()

        if (pattern) {
            const compiledPattern: CompiledPattern = await setPattern(pattern)
            play()

            return compiledPattern
        }

        return undefined
    }

export {
    setupPerformer,
}
