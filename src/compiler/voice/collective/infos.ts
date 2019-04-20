import {
    allValuesAreTheSame,
    as,
    computeLeastCommonMultiple,
    max,
    Ms,
    NO_DURATION,
    notAs,
    round,
    sum,
} from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { IndividualVoiceAndInfo, IndividualVoiceInfo } from '../individual'
import { CollectiveVoiceInfos, PluckedVoiceInfos } from './types'

const pluckInfos: (individualVoicesAndInfos: IndividualVoiceAndInfo[]) => PluckedVoiceInfos =
    (individualVoicesAndInfos: IndividualVoiceAndInfo[]): PluckedVoiceInfos => {
        const individualVoiceInfos: IndividualVoiceInfo[] = individualVoicesAndInfos.map(
            (voiceAndInfo: IndividualVoiceAndInfo) => voiceAndInfo.voiceInfo,
        )

        const individualSegnoTimes: Ms[] = individualVoiceInfos.map((voiceInfo: IndividualVoiceInfo) =>
            voiceInfo.individualSegnoTime,
        )
        const individualRepetendDurations: Ms[] = individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo) =>
            individualVoiceInfo.individualRepetendDuration,
        )
        const individualEndTimes: Ms[] =
            individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo) =>
                individualVoiceInfo.individualEndTime,
            )

        return {
            individualEndTimes,
            individualRepetendDurations,
            individualSegnoTimes,
        }
    }

const computeCollectiveInfosFromPluckedInfos: (parameters: {
    individualEndTimes: Ms[],
    individualRepetendDurations: Ms[],
    individualSegnoTimes: Ms[],
}) => CollectiveVoiceInfos =
    (
        { individualEndTimes, individualRepetendDurations, individualSegnoTimes }: PluckedVoiceInfos,
    ): CollectiveVoiceInfos => {
        const collectiveShareSegnoTime: boolean = allValuesAreTheSame(individualSegnoTimes)
        const collectiveSegnoTime: Ms = max(...individualSegnoTimes)
        const collectiveRepetendDuration: Ms = collectiveSegnoTime === NON_SEGNO_TIME ?
            NON_SEGNO_TIME :
            as.Ms(computeLeastCommonMultiple(
                ...individualRepetendDurations
                    .filter((individualRepetendDuration: Ms) => individualRepetendDuration !== NO_DURATION)
                    // tslint:disable-next-line no-unnecessary-callback-wrapper
                    .map((individualRepetendDuration: Ms) => round(individualRepetendDuration))
                    .map(notAs.Ms)
                    .map(as.Integer),
            ))
        const collectiveEndTime: Ms = collectiveSegnoTime === NON_SEGNO_TIME ?
            max(...individualEndTimes) :
            sum(collectiveSegnoTime, collectiveRepetendDuration)

        return {
            collectiveEndTime,
            collectiveRepetendDuration,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
        }
    }

const computeCollectiveInfos: (individualVoicesAndInfos: IndividualVoiceAndInfo[]) => CollectiveVoiceInfos =
    (individualVoicesAndInfos: IndividualVoiceAndInfo[]): CollectiveVoiceInfos =>
        computeCollectiveInfosFromPluckedInfos(pluckInfos(individualVoicesAndInfos))

export {
    computeCollectiveInfos,
}
