// tslint:disable no-reaching-imports

export {
    compilePattern,
    compileSound,
    compileSoundFeature,
    NoteFeature,
    Note,
    CompileSoundsOptions,
    compileSourceRequest,
    TimbreNameEnum,
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
} from './compiler/indexForTest'
export {
    CompiledPattern,
} from './interface/indexForTest'
export {
    computeOctaveSeriesScale,
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
    computeTotalPitchDurationContourDuration,
    PitchCircularTechnique,
    pitchCirculate,
    Segment,
    PitchDuration,
} from './patterns/indexForTest'
export {
    update,
    NON_SEGNO_TIME,
    NON_SEGNO_INDEX,
    SourceType,
    prepareVoices,
    OscillatorName,
    SampleName,
    computePatternTime,
    PreparedVoice,
    Voice,
    Sound,
    SourceRequest,
} from './performer/indexForTest'

export {
    Scale,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
} from './types'
