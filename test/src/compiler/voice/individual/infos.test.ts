import { to } from '@musical-patterns/utilities'
import { computeIndividualVoiceInfo, IndividualVoiceInfo, SectionInfo } from '../../../../../src/indexForTest'

describe('compute individual voice info', () => {
    it('the individual repetend duration is the duration of the first section which repeats forever; the section infos pass through; the individual end time is the sum of the section durations; the segno time is the time that the repetend begins', () => {
        const sectionInfos: SectionInfo[] = [
            {
                doesRepeatForever: false,
                totalDuration: to.Ms(99),
            },
            {
                doesRepeatForever: true,
                totalDuration: to.Ms(11),
            },
        ]

        const actualIndividualVoiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(sectionInfos)

        expect(actualIndividualVoiceInfo)
            .toEqual({
                individualEndTime: to.Ms(110),
                individualRepetendDuration: to.Ms(11),
                individualSegnoTime: to.Ms(99),
                sectionInfos,
            })
    })
})
