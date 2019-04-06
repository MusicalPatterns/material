import { noop } from '@musical-patterns/utilities'
import { computeSampleData } from '../preparation'
import { activateContextInMobileBrowserEnvironments, OnUpdate, setupClock, setupTimeControls } from '../setup'
import { play } from './play'
import { setPattern } from './setPattern'
import { CompiledPattern, SetupPerformerParameters } from './types'

const setupPerformer: (parameters?: {
    compiledPattern?: CompiledPattern,
    onUpdate?: OnUpdate,
}) => Promise<void> =
    async ({ onUpdate = noop, compiledPattern }: SetupPerformerParameters = {}): Promise<void> => {
        activateContextInMobileBrowserEnvironments()
        setupTimeControls(onUpdate)
        computeSampleData()
        setupClock()

        if (compiledPattern) {
            await setPattern(compiledPattern)
            play()
        }
    }

export {
    setupPerformer,
}
