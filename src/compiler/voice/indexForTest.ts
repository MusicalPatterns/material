// tslint:disable no-reaching-imports

export { compileVoices } from './voices'

export {
    computeIndividualVoiceAndInfo,
    IndividualVoiceAndInfo,
    SectionInfo,
    computeIndividualVoiceInfo,
    IndividualVoiceInfo,
    computeIndividualRepetendDuration,
    computeIndividualSegnoTime,
    computeIndividualSoundsAndSectionInfos,
    SoundsAndSectionInfos,
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
} from './individual/indexForTest'
export {
    applyCollectiveInfos,
    computeRepetendSounds,
    computeSegnoIndex,
    computeFillGapSounds,
    fillGap,
    computeCollectiveInfos,
    CollectiveVoiceInfos,
} from './collective/indexForTest'
export { computeNotesTotalCompiledDuration } from './totalCompiledDuration'

export {
    Section,
} from './types'
