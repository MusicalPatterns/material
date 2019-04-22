import { as, BEGINNING, INITIAL, Ms, ofNotAs, Ordinal, slice, use } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal<SectionInfo[]>) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal<SectionInfo[]>): Ms =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Ms, sectionInfo: SectionInfo) =>
                    use.Translation(accumulator, as.Translation(ofNotAs(sectionInfo.totalDuration))),
                BEGINNING,
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Ordinal<SectionInfo[]>, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
