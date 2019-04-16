import { apply, BEGINNING, Index, INITIAL, Ms, ofUnits, slice, to } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Index<SectionInfo>) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Index<SectionInfo>): Ms =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Ms, sectionInfo: SectionInfo) =>
                    apply.Translation(accumulator, to.Translation(ofUnits<'Ms'>(sectionInfo.totalDuration))),
                BEGINNING,
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Index<SectionInfo>, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
