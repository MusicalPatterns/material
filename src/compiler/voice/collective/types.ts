import { Duration, Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { Sound, Voice } from '../../../performer'
import { Entity, Scale } from '../../../types'
import { SectionInfo } from '../individual'
import { CompileVoicesParameters, Section } from '../types'

interface ComputeRepetendSoundsParameters {
    scales: Scale[],
    sectionInfos: SectionInfo[],
    sections: Section[],
}

interface FillGapParameters {
    collectiveEndTime: Point<Ms>,
    scales: Scale[],
    sectionInfos: SectionInfo[],
    sections: Section[],
    sounds: Sound[],
}

interface ComputeSegnoIndexParameters {
    collectiveSegnoTime: Point<Ms>,
    individualSegnoTime: Point<Ms>,
    voice: Voice,
}

interface PluckedVoiceInfos {
    individualEndTimes: Array<Point<Ms>>,
    individualRepetendDurations: Duration[],
    individualSegnoTimes: Array<Point<Ms>>,
}

interface CollectiveVoiceInfos {
    collectiveEndTime: Point<Ms>,
    collectiveRepetendDuration: Duration,
    collectiveSegnoTime: Point<Ms>,
    collectiveShareSegnoTime: boolean,
}

interface ApplyCollectiveInfosParameters extends CompileVoicesParameters {
    collectiveEndTime: Point<Ms>,
    collectiveSegnoTime: Point<Ms>,
    collectiveShareSegnoTime: boolean,
    entityIndex: Ordinal<Entity[]>,
    individualSegnoTime: Point<Ms>,
    sectionInfos: SectionInfo[],
    voice: Voice,
}

export {
    ComputeRepetendSoundsParameters,
    FillGapParameters,
    ComputeSegnoIndexParameters,
    PluckedVoiceInfos,
    CollectiveVoiceInfos,
    ApplyCollectiveInfosParameters,
}
