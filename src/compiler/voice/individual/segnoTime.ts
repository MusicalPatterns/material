import { apply, BEGINNING, Index, INITIAL, Ms, slice, to } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Index) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Index): Ms =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Ms, sectionInfo: SectionInfo) =>
                    apply.Translation(accumulator, to.Translation(to.Index(sectionInfo.totalDuration))),
                BEGINNING,
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Index, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
