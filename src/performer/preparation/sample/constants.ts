// tslint:disable no-magic-numbers

import {
    as,
    negative,
    Pitch,
    SCIENTIFIC_PITCHES,
    ScientificPitchNoteName,
    ScientificPitchOctaveNumber,
    Semitones,
} from '@musical-patterns/utilities'

const UP_TWO_SEMITONES: Semitones = as.Semitones(2)
const DOWN_ONE_SEMITONE: Semitones = as.Semitones(negative(1))
const UP_ONE_OCTAVE_IN_SEMITONES: Semitones = as.Semitones(12)
const UP_TWO_OCTAVES_IN_SEMITONES: Semitones = as.Semitones(24)
const DOWN_TWO_OCTAVES_IN_SEMITONES: Semitones = as.Semitones(negative(24))

const STANDARDIZED_SAMPLE_PITCH_OF_C5: Pitch =
    SCIENTIFIC_PITCHES[ ScientificPitchNoteName.C ][ ScientificPitchOctaveNumber._5 ]

export {
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_TWO_SEMITONES,
    STANDARDIZED_SAMPLE_PITCH_OF_C5,
}
