import { apply, Cents, CENTS_PER_SEMITONE, Semitones, to } from '@musical-patterns/utilities'
import { StateKey, store } from '../../state'
import {
    DOWN_ONE_SEMITONE,
    DOWN_TWO_OCTAVES_IN_SEMITONES,
    UP_ONE_OCTAVE_IN_SEMITONES,
    UP_TWO_OCTAVES_IN_SEMITONES,
    UP_TWO_SEMITONES,
} from './constants'
import { SampleDatas, SampleName } from './types'

const semitonesToCents: (semitones: Semitones) => Cents =
    (semitones: Semitones): Cents =>
        apply.Scalar(CENTS_PER_SEMITONE, to.Scalar(semitones))

const computeSampleData: VoidFunction =
    (): void => {
        const sampleData: SampleDatas = {
            [ SampleName.CELLO ]: {},
            [ SampleName.DOUBLE_BASS ]: {
                centsTranslation: to.Translation(semitonesToCents(UP_TWO_OCTAVES_IN_SEMITONES)),
            },
            [ SampleName.FLUTE ]: {},
            [ SampleName.PIANO ]: {
                centsTranslation: to.Translation(semitonesToCents(DOWN_TWO_OCTAVES_IN_SEMITONES)),
            },
            [ SampleName.TROMBONE ]: {
                centsTranslation: to.Translation(semitonesToCents(UP_TWO_SEMITONES)),
            },
            [ SampleName.TRUMPET ]: {
                centsTranslation: to.Translation(semitonesToCents(DOWN_ONE_SEMITONE)),
            },
            [ SampleName.TUBA ]: {
                centsTranslation: to.Translation(semitonesToCents(UP_ONE_OCTAVE_IN_SEMITONES)),
            },
            [ SampleName.VIOLIN ]: {},
            [ SampleName.SNARE ]: {
                unpitched: true,
            },
            [ SampleName.KICK ]: {
                unpitched: true,
            },
            [ SampleName.HIHAT ]: {
                unpitched: true,
            },
        }

        store.dispatch({ type: StateKey.SAMPLE_DATA, data: sampleData })
    }

export {
    computeSampleData,
}
