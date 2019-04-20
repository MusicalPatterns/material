import { as } from '@musical-patterns/utilities'
import { computeIndividualVoiceInfo, IndividualVoiceInfo, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual voice info', () => {
    it('the individual repetend duration is the duration of the first section which repeats forever; the section infos pass through; the individual end time is the sum of the section durations; the segno time is the time that the repetend begins', () => {
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: as.Ms(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: as.Ms(11),
            },
        ]

        const actualIndividualVoiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(sectionInfos)

        expect(actualIndividualVoiceInfo)
            .toEqual({
                individualEndTime: as.Ms(110),
                individualRepetendDuration: as.Ms(11),
                individualSegnoTime: as.Ms(99),
                sectionInfos,
            })
    })
})
