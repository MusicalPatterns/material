import { Ms, Ordinal, Point, Translation } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'

interface ComputeIndividualRepetendDurationParameters {
    individualRepetendIndex: Ordinal<SectionInfo[]>,
    sectionInfos: SectionInfo[],
}

interface ComputeIndividualSegnoTimeParameters {
    individualRepetendIndex: Ordinal<SectionInfo[]>,
    sectionInfos: SectionInfo[],
}

interface IndividualVoiceInfo {
    individualEndTime: Point<Ms>,
    individualRepetendDuration: Translation<Ms>,
    individualSegnoTime: Point<Ms>,
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
    totalDuration: Translation<Ms>,
}

export {
    ComputeIndividualRepetendDurationParameters,
    ComputeIndividualSegnoTimeParameters,
    IndividualVoiceAndInfo,
    IndividualVoiceInfo,
    SectionInfo,
    SoundsAndSectionInfos,
}
