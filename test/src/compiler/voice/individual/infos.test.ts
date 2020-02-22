import { as, Ms, musicalAs } from '@musical-patterns/utilities'
import { computeIndividualVoiceInfo, IndividualVoiceInfo, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual voice info', (): void => {
    it('the individual repetend duration is the duration of the first section which repeats forever; the section infos pass through; the individual end time is the sum of the section durations; the segno time is the time that the repetend begins', (): void => {
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: musicalAs.Duration(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: musicalAs.Duration(11),
            },
        ]

        const actualIndividualVoiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(sectionInfos)

        expect(actualIndividualVoiceInfo)
            .toEqual({
                individualEndTime: as.Point<Ms>(110),
                individualRepetendDuration: musicalAs.Duration(11),
                individualSegnoTime: as.Point<Ms>(99),
                sectionInfos,
            })
    })
})
