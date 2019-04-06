import { Ms, Ordinal } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'
import { Scale } from '../../types'
import { IndividualVoiceAndInfo, SectionInfo } from '../individual'
import { CompileVoicesParameters, Section } from '../types'

interface ComputeRepetendSoundsParameters {
    scales: Scale[],
    sectionInfos: SectionInfo[],
    sections: Section[],
}

interface FillGapParameters {
    collectiveEndTime: Ms,
    scales: Scale[],
    sectionInfos: SectionInfo[],
    sections: Section[],
    sounds: Sound[],
}

interface ComputeSegnoIndexParameters {
    collectiveSegnoTime: Ms,
    individualSegnoTime: Ms,
    voice: Voice,
}

interface PluckedVoiceInfos {
    individualEndTimes: Ms[],
    individualRepetendDurations: Ms[],
    individualSegnoTimes: Ms[],
}

interface CollectiveVoiceInfos {
    collectiveEndTime: Ms,
    collectiveRepetendDuration: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
}

interface ApplyCollectiveInfosParameters extends CompileVoicesParameters {
    collectiveEndTime: Ms,
    collectiveSegnoTime: Ms,
    collectiveShareSegnoTime: boolean,
    index: Ordinal,
    individualSegnoTime: Ms,
    sectionInfos: SectionInfo[],
    voice: Voice,
}

interface ComputeCollectiveVoicesFromIndividualVoicesAndInfosParameters extends CompileVoicesParameters {
    individualVoicesAndInfos: IndividualVoiceAndInfo[],
}

export {
    ComputeRepetendSoundsParameters,
    FillGapParameters,
    ComputeSegnoIndexParameters,
    PluckedVoiceInfos,
    CollectiveVoiceInfos,
    ApplyCollectiveInfosParameters,
    ComputeCollectiveVoicesFromIndividualVoicesAndInfosParameters,
}
