import { as, Duration, findIndex, Ms,  Ordinal, Point, sum } from '@musical-patterns/utilities'
import { computeIndividualRepetendDuration } from './repetendDuration'
import { computeIndividualSegnoTime } from './segnoTime'
import { IndividualVoiceInfo, SectionInfo } from './types'

const computeIndividualVoiceInfo: (sectionInfos: SectionInfo[]) => IndividualVoiceInfo =
    (sectionInfos: SectionInfo[]): IndividualVoiceInfo => {
        const individualRepetendIndex: Ordinal<SectionInfo[]> = findIndex(
            sectionInfos,
            (sectionInfo: SectionInfo) => sectionInfo.doesRepeatForever,
        )

        const individualSegnoTime: Point<Ms> = computeIndividualSegnoTime({
            individualRepetendIndex,
            sectionInfos,
        })
        const individualRepetendDuration: Duration = computeIndividualRepetendDuration({
            individualRepetendIndex,
            sectionInfos,
        })
        const individualEndTime: Point<Ms> = as.Point<Ms>(as.number(sum(
            ...sectionInfos.map((sectionInfo: SectionInfo) => sectionInfo.totalDuration),
        )))

        return {
            individualEndTime,
            individualRepetendDuration,
            individualSegnoTime,
            sectionInfos,
        }
    }

export {
    computeIndividualVoiceInfo,
}
