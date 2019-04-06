// @ts-ignore
import * as periodicWaves from '@mohayonao/wave-tables'
import { isUndefined, logMessageToConsole, Maybe } from '@musical-patterns/utilities'
import { context } from '../../performance'
import {
    ComputePeriodicWave,
    CreatePeriodicWaveParameters,
    OscillatorName,
    OscillatorNameToPeriodicWaveNameMap,
} from './types'

const oscillatorNameToPeriodicWaveNameMap: OscillatorNameToPeriodicWaveNameMap = {
    BASS: 'Bass',
    BASS_AMP_360: 'BassAmp360',
    BASS_FUZZ: 'BassFuzz',
    BASS_FUZZ_2: 'BassFuzz2',
    BASS_SUB_DUB: 'BassSubDub',
    BASS_SUB_DUB_2: 'BassSubDub2',
    BRASS: 'Brass',
    BRIT_BLUES: 'BritBlues',
    BRIT_BLUES_DRIVEN: 'BritBluesDriven',
    BUZZY_1: 'Buzzy1',
    BUZZY_2: 'Buzzy2',
    CELESTE: 'Celeste',
    CHORUS_STRINGS: 'ChorusStrings',
    DISSONANT_1: 'Dissonant1',
    DISSONANT_2: 'Dissonant2',
    DISSONANT_PIANO: 'DissonantPiano',
    DROPPED_SAW: 'DroppedSaw',
    DROPPED_SQUARE: 'DroppedSquare',
    DYNA_EP_BRIGHT: 'DynaEPBright',
    DYNA_EP_MED: 'DynaEPMed',
    ETHNIC_33: 'Ethnic33',
    FULL_1: 'Full1',
    FULL_2: 'Full2',
    GUITAR_FUZZ: 'GuitarFuzz',
    HARSH: 'Harsh',
    MKL_HARD: 'MklHard',
    NOISE: 'Noise',
    ORGAN_2: 'Organ2',
    ORGAN_3: 'Organ3',
    PHONEME_AH: 'PhonemeAh',
    PHONEME_BAH: 'PhonemeBah',
    PHONEME_EE: 'PhonemeEe',
    PHONEME_O: 'PhonemeO',
    PHONEME_OOH: 'PhonemeOoh',
    PHONEME_POP_AHHHS: 'PhonemePopAhhhs',
    PIANO_OSCILLATOR: 'Piano',
    PULSE: 'Pulse',
    PUTNEY_WAVERING: 'PutneyWavering',
    SAW: 'Saw',
    SINE: 'Sine',
    SQUARE: 'Square',
    TB303_SQUARE: 'TB303Square',
    THROATY: 'Throaty',
    TRIANGLE: 'Triangle',
    TROMBONE_OSCILLATOR: 'Trombone',
    TWELVE_OP_TINES: 'TwelveOpTines',
    TWELVE_STRING_GUITAR_1: 'TwelveStringGuitar1',
    WARM_SAW: 'WarmSaw',
    WARM_SQUARE: 'WarmSquare',
    WARM_TRIANGLE: 'WarmTriangle',
    WURLITZER: 'Wurlitzer',
    WURLITZER_2: 'Wurlitzer2',
}

const createSineWaveParameters: CreatePeriodicWaveParameters = { imag: [ 0, 0 ], real: [ 0, 1 ] }

const computeCreatePeriodicWaveParameters: (oscillatorName: OscillatorName) => { imag: number[], real: number[] } =
    (oscillatorName: OscillatorName): CreatePeriodicWaveParameters => {
        const oscillatorNameToPeriodicWaveNameMapElement: string = oscillatorNameToPeriodicWaveNameMap[ oscillatorName ]
        const createPeriodicWaveParameters: Maybe<CreatePeriodicWaveParameters> =
            periodicWaves[ oscillatorNameToPeriodicWaveNameMapElement ]

        if (isUndefined(createPeriodicWaveParameters)) {
            logMessageToConsole(`No periodic wave was found for oscillator name ${oscillatorName}. \
Defaulting to sine. Please try updating your '@musical-patterns' packages.`)

            return createSineWaveParameters
        }

        return createPeriodicWaveParameters
    }

const computePeriodicWave: ComputePeriodicWave =
    (oscillatorName: OscillatorName): PeriodicWave => {
        const { real, imag } = oscillatorName === OscillatorName.SINE ?
            createSineWaveParameters :
            computeCreatePeriodicWaveParameters(oscillatorName)

        return context.createPeriodicWave(Float32Array.from(real), Float32Array.from(imag))
    }

export {
    computePeriodicWave,
}
