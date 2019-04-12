import { apply, Index, isEmpty, Ms, NO_DURATION } from '@musical-patterns/utilities'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualRepetendDurationParameters, SectionInfo } from './types'

const computeIndividualRepetendDuration:
    (parameters: { individualRepetendIndex: Index, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualRepetendDurationParameters): Ms =>
        individualRepetendIndex === NOT_FOUND || isEmpty(sectionInfos) ?
            NO_DURATION :
            apply.Index(sectionInfos, individualRepetendIndex as Index<SectionInfo>).totalDuration

export {
    computeIndividualRepetendDuration,
}
