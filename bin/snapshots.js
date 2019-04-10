const ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING = '../../../../'

require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING}test/mockDom`)
const { appendFileSync, existsSync, unlinkSync } = require('fs')
const { compilePattern } = require('@musical-patterns/compiler')

const saveSnapshot = (compiledPattern, name) => {
    const snapshotsFile = `snapshots/${name}.json`
    existsSync(snapshotsFile) && unlinkSync(snapshotsFile)
    appendFileSync(snapshotsFile, JSON.stringify(compiledPattern, null, 2))
}

const updateSnapshots = async () => {
    const { pattern } = require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING}src`)

    const compiledInitial = await compilePattern(pattern)
    saveSnapshot(compiledInitial, 'initial')

    if (pattern.spec.presets) {
        await Promise.all(Object.entries(pattern.spec.presets).map(async ([ presetName, preset ]) => {
            const compiledPreset = await compilePattern({ material: pattern.material, specs: preset.specs })
            saveSnapshot(compiledPreset, presetName)
        }))
    }
}

updateSnapshots()
    .then()
    .catch()
