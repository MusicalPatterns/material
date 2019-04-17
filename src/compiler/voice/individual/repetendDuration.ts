import { apply, isEmpty, Ms, NO_DURATION, Ordinal } from '@musical-patterns/utilities'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualRepetendDurationParameters, SectionInfo } from './types'

const computeIndividualRepetendDuration:
    (parameters: { individualRepetendIndex: Ordinal<SectionInfo>, sectionInfos: SectionInfo[] }) => Ms =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualRepetendDurationParameters): Ms =>
        individualRepetendIndex === NOT_FOUND || isEmpty(sectionInfos) ?
            NO_DURATION :
            apply.Ordinal(sectionInfos, individualRepetendIndex).totalDuration

export {
    computeIndividualRepetendDuration,
}
