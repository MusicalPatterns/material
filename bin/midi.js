const { Midi } = require('@tonejs/midi')

const ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING = '../../../../'

require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING}test/mockDom`)
const { appendFileSync, existsSync, unlinkSync } = require('fs')
const { compilePattern } = require('@musical-patterns/material')

Error.stackTraceLimit = Infinity

const SCIENTIFIC_PITCH_INDEX_OF_A4 = 57
const SCIENTIFIC_PITCHES = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
]

const computeNameAndCentsDeviation = (tone) => {
    const differenceInOctavesFromA4 = Math.log2(tone / 440)
    let scientificPitchIndex = SCIENTIFIC_PITCH_INDEX_OF_A4 + differenceInOctavesFromA4 * 12
    let centsDeviation = Math.round((scientificPitchIndex % 1) * 100)
    if (centsDeviation > 50) {
        scientificPitchIndex = scientificPitchIndex + 1
        centsDeviation = -100 + centsDeviation
    }

    const noteName = SCIENTIFIC_PITCHES[ Math.floor(scientificPitchIndex) % 12 ]
    const noteOctave = Math.floor(scientificPitchIndex / 12)
    const name = noteName && noteOctave && `${noteName}${noteOctave}` || 'A4'

    return { name, centsDeviation }
}

const saveMidi = (compiledPattern, name) => {
    const midiFile = `midi/${name}.mid`

    const midi = new Midi()

    compiledPattern.voices.forEach((voice) => {
        const track = midi.addTrack()

        let time = 0
        voice.sounds.forEach((sound) => {
            const { name, centsDeviation } = computeNameAndCentsDeviation(sound.tone)
            const duration = sound.duration / 1000
            const value = centsDeviation * 4096 / 50
            const velocity = sound.gain

            track.addNote({ name, velocity, time, duration })
            track.addPitchBend({ value, time, });

            time += duration
        })
    })

    existsSync(midiFile) && unlinkSync(midiFile)
    appendFileSync(midiFile, new Buffer(midi.toArray()))
}

const updateMidi = async () => {
    const { pattern } = require(`${ESCAPE_COMPILER_NODE_MODULES_FOR_PATTERN_FOR_REQUIRING}src`)

    const compiledInitial = await compilePattern(pattern)
    saveMidi(compiledInitial, 'initial')

    if (pattern.spec.presets) {
        await Promise.all(Object.entries(pattern.spec.presets).map(async ([ presetName, preset ]) => {
            const compiledPreset = await compilePattern({ material: pattern.material, specs: preset.specs })
            saveMidi(compiledPreset, presetName)
        }))
    }
}

updateMidi()
    .then()
    .catch()
