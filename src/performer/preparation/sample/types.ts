import { Cents, Translation } from '@musical-patterns/utilities'

enum SampleName {
    CELLO = 'CELLO',
    DOUBLE_BASS = 'DOUBLE_BASS',
    FLUTE = 'FLUTE',
    PIANO = 'PIANO',
    TROMBONE = 'TROMBONE',
    TRUMPET = 'TRUMPET',
    TUBA = 'TUBA',
    VIOLIN = 'VIOLIN',
    SNARE = 'SNARE',
    KICK = 'KICK',
    HIHAT = 'HIHAT',
}

interface SampleData {
    centsTranslation?: Translation<Cents>,
    unpitched?: boolean,
}

type SampleDatas = { [Index in SampleName]: SampleData }

type Samples = { [Index in SampleName]: AudioBuffer }

export {
    SampleName,
    SampleDatas,
    SampleData,
    Samples,
}
