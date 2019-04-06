import { BEGINNING, INITIAL, NO_DURATION, to } from '@musical-patterns/utilities'
import {
    CollectiveVoiceInfos,
    computeCollectiveInfos,
    IndividualVoiceAndInfo,
    OscillatorName,
    SourceType,
    Voice,
} from '../../../../../src/indexForTest'

describe('compute collective infos', () => {
    const IRRELEVANT_VOICE: Voice = {
        delay: NO_DURATION,
        segnoIndex: INITIAL,
        sounds: [],
        sourceRequest: {
            sourceType: SourceType.OSCILLATOR,
            timbreName: OscillatorName.SINE,
        },
    }

    it('works with a mix of forever repeating and non-forever-repeating voices', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(5),
                    individualRepetendDuration: to.Ms(4),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(3),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(9),
                    individualRepetendDuration: NO_DURATION,
                    individualSegnoTime: to.Ms(-1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(13),
                collectiveRepetendDuration: to.Ms(12),
                collectiveSegnoTime: to.Ms(1),
                collectiveShareSegnoTime: false,
            })
    })

    it('correctly identifies when voices share a segno time', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(5),
                    individualRepetendDuration: to.Ms(4),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(4),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: to.Ms(1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(13),
                collectiveRepetendDuration: to.Ms(12),
                collectiveSegnoTime: to.Ms(1),
                collectiveShareSegnoTime: true,
            })
    })

    it('when the voices do not share a segno time, the collective segno time is the maximum of all the individual ones', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(7),
                    individualRepetendDuration: to.Ms(4),
                    individualSegnoTime: to.Ms(3),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(5),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: to.Ms(2),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(15),
                collectiveRepetendDuration: to.Ms(12),
                collectiveSegnoTime: to.Ms(3),
                collectiveShareSegnoTime: false,
            })
    })

    it('when none of the voices repeat forever, the collective end time is the maximum of the individual end times', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(3),
                    individualRepetendDuration: to.Ms(3),
                    individualSegnoTime: to.Ms(-1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(9),
                    individualRepetendDuration: NO_DURATION,
                    individualSegnoTime: to.Ms(-1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(9),
                collectiveRepetendDuration: to.Ms(-1),
                collectiveSegnoTime: to.Ms(-1),
                collectiveShareSegnoTime: true,
            })
    })

    it('rounds the durations to prevent skyrocketing collective duration', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(12.999999),
                    individualRepetendDuration: to.Ms(12.999999),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: to.Ms(13.000001),
                    individualRepetendDuration: to.Ms(13.000001),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: to.Ms(13),
                collectiveRepetendDuration: to.Ms(13),
                collectiveSegnoTime: BEGINNING,
                collectiveShareSegnoTime: true,
            })
    })
})
