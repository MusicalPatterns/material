import { as, Ms } from '@musical-patterns/utilities'
import { computeIndividualVoiceInfo, IndividualVoiceInfo, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual voice info', () => {
    it('the individual repetend duration is the duration of the first section which repeats forever; the section infos pass through; the individual end time is the sum of the section durations; the segno time is the time that the repetend begins', () => {
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Delta<Ms>(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Delta<Ms>(11),
            },
        ]

        const actualIndividualVoiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(sectionInfos)

        expect(actualIndividualVoiceInfo)
            .toEqual({
                individualEndTime: as.Point<Ms>(110),
                individualRepetendDuration: as.Delta<Ms>(11),
                individualSegnoTime: as.Point<Ms>(99),
                sectionInfos,
            })
    })
})
