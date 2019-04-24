// tslint:disable no-reaching-imports

export { compilePattern } from './patterns'

export {
    compileSound,
    compileSoundFeature,
    NoteFeature,
    Note,
    CompileSoundsOptions,
} from './sound/indexForTest'
export {
    compileSourceRequest,
    TimbreNameEnum,
} from './source/indexForTest'
export {
    computeNotesTotalCompiledDuration,
    computeIndividualVoiceAndInfo,
    IndividualVoiceAndInfo,
    Section,
    SectionInfo,
    computeRepetendSounds,
    computeFillGapSounds,
    fillGap,
    computeSegnoIndex,
    applyCollectiveInfos,
    CollectiveVoiceInfos,
    computeCollectiveInfos,
    computeIndividualVoiceInfo,
    IndividualVoiceInfo,
    computeIndividualRepetendDuration,
    computeIndividualSegnoTime,
    computeIndividualSoundsAndSectionInfos,
    SoundsAndSectionInfos,
    compileVoices,
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
} from './voice/indexForTest'
