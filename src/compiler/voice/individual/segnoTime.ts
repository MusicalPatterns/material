import { BEGINNING, INITIAL, Ms, Ordinal, Point, slice, use } from '@musical-patterns/utilities'
import { NON_SEGNO_TIME } from '../../../performer'
import { NOT_FOUND } from '../constants'
import { ComputeIndividualSegnoTimeParameters, SectionInfo } from './types'

const computeIndividualSegnoTimeWhenVoiceHasRepetend:
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal<SectionInfo[]>) => Point<Ms> =
    (sectionInfos: SectionInfo[], individualRepetendIndex: Ordinal<SectionInfo[]>): Point<Ms> =>
        slice(sectionInfos, INITIAL, individualRepetendIndex)
            .reduce(
                (accumulator: Point<Ms>, sectionInfo: SectionInfo): Point<Ms> =>
                    use.Translation(accumulator, sectionInfo.totalDuration),
                BEGINNING,
            )

const computeIndividualSegnoTime:
    (parameters: { individualRepetendIndex: Ordinal<SectionInfo[]>, sectionInfos: SectionInfo[] }) => Point<Ms> =
    ({ individualRepetendIndex, sectionInfos }: ComputeIndividualSegnoTimeParameters): Point<Ms> =>
        individualRepetendIndex === NOT_FOUND ?
            NON_SEGNO_TIME :
            computeIndividualSegnoTimeWhenVoiceHasRepetend(sectionInfos, individualRepetendIndex)

export {
    computeIndividualSegnoTime,
}
