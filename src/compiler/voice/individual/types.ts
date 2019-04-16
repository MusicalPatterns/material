import { Index, Ms } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'

interface ComputeIndividualRepetendDurationParameters {
    individualRepetendIndex: Index<SectionInfo>,
    sectionInfos: SectionInfo[],
}

interface ComputeIndividualSegnoTimeParameters {
    individualRepetendIndex: Index<SectionInfo>,
    sectionInfos: SectionInfo[],
}

interface IndividualVoiceInfo {
    individualEndTime: Ms,
    individualRepetendDuration: Ms,
    individualSegnoTime: Ms,
    sectionInfos: SectionInfo[],
}

interface IndividualVoiceAndInfo {
    voice: Voice,
    voiceInfo: IndividualVoiceInfo,
}

interface SoundsAndSectionInfos {
    sectionInfos: SectionInfo[],
    sounds: Sound[],
}

interface SectionInfo {
    doesRepeatForever: boolean,
    totalDuration: Ms,
}

export {
    ComputeIndividualRepetendDurationParameters,
    ComputeIndividualSegnoTimeParameters,
    IndividualVoiceAndInfo,
    IndividualVoiceInfo,
    SectionInfo,
    SoundsAndSectionInfos,
}
