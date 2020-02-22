import {
    allValuesAreTheSame,
    as,
    computeLeastCommonMultiple,
    Duration,
    max,
    Ms,
    musicalAs,
    NO_DURATION,
    Point,
    round,
    sum,
} from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { IndividualVoiceAndInfo, IndividualVoiceInfo } from '../individual'
import { CollectiveVoiceInfos, PluckedVoiceInfos } from './types'

const pluckInfos: (individualVoicesAndInfos: IndividualVoiceAndInfo[]) => PluckedVoiceInfos =
    (individualVoicesAndInfos: IndividualVoiceAndInfo[]): PluckedVoiceInfos => {
        const individualVoiceInfos: IndividualVoiceInfo[] = individualVoicesAndInfos.map(
            (voiceAndInfo: IndividualVoiceAndInfo): IndividualVoiceInfo => voiceAndInfo.voiceInfo,
        )

        const individualSegnoTimes: Array<Point<Ms>> =
            individualVoiceInfos.map((voiceInfo: IndividualVoiceInfo): Point<Ms> =>
                voiceInfo.individualSegnoTime,
            )
        const individualRepetendDurations: Duration[] =
            individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo): Duration =>
                individualVoiceInfo.individualRepetendDuration,
            )
        const individualEndTimes: Array<Point<Ms>> =
            individualVoiceInfos.map((individualVoiceInfo: IndividualVoiceInfo): Point<Ms> =>
                individualVoiceInfo.individualEndTime,
            )

        return {
            individualEndTimes,
            individualRepetendDurations,
            individualSegnoTimes,
        }
    }

const computeCollectiveInfosFromPluckedInfos: (parameters: {
    individualEndTimes: Array<Point<Ms>>,
    individualRepetendDurations: Duration[],
    individualSegnoTimes: Array<Point<Ms>>,
}) => CollectiveVoiceInfos =
    (
        { individualEndTimes, individualRepetendDurations, individualSegnoTimes }: PluckedVoiceInfos,
    ): CollectiveVoiceInfos => {
        const collectiveShareSegnoTime: boolean = allValuesAreTheSame(individualSegnoTimes)
        const collectiveSegnoTime: Point<Ms> = max(...individualSegnoTimes)
        const collectiveRepetendDuration: Duration = musicalAs.Duration(collectiveSegnoTime === NON_SEGNO_TIME ?
            as.number(NON_SEGNO_TIME) :
            computeLeastCommonMultiple(
                ...individualRepetendDurations
                    .filter(
                        (individualRepetendDuration: Duration): boolean => individualRepetendDuration !== NO_DURATION,
                    )
                    // tslint:disable-next-line no-unnecessary-callback-wrapper
                    .map((individualRepetendDuration: Duration): Duration => round(individualRepetendDuration))
                    .map(as.Integer),
            ),
        )
        const collectiveEndTime: Point<Ms> = collectiveSegnoTime === NON_SEGNO_TIME ?
            max(...individualEndTimes) :
            sum(collectiveSegnoTime, as.Point<Ms>(as.number(collectiveRepetendDuration)))

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
