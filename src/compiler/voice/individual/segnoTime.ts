import { apply, BEGINNING, INITIAL, Ms, Ordinal, slice, to } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal) => Ms =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal): Ms =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Ms, sectionInfo: SectionInfo) =>
                    apply.Translation(accumulator, to.Translation(sectionInfo.totalDuration)),
                BEGINNING,
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Ordinal, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Ms =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
