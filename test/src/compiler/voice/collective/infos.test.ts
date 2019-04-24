import { as, BEGINNING, INITIAL, Ms, NO_DURATION, Point } from '@musical-patterns/utilities'
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
                    individualEndTime: as.Point<Ms>(5),
                    individualRepetendDuration: as.Translation<Point<Ms>>(4),
                    individualSegnoTime: as.Point<Ms>(1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(3),
                    individualRepetendDuration: as.Translation<Point<Ms>>(3),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(9),
                    individualRepetendDuration: NO_DURATION,
                    individualSegnoTime: as.Point<Ms>(-1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: as.Point<Ms>(13),
                collectiveRepetendDuration: as.Translation<Point<Ms>>(12),
                collectiveSegnoTime: as.Point<Ms>(1),
                collectiveShareSegnoTime: false,
            })
    })

    it('correctly identifies when voices share a segno time', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(5),
                    individualRepetendDuration: as.Translation<Point<Ms>>(4),
                    individualSegnoTime: as.Point<Ms>(1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(4),
                    individualRepetendDuration: as.Translation<Point<Ms>>(3),
                    individualSegnoTime: as.Point<Ms>(1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: as.Point<Ms>(13),
                collectiveRepetendDuration: as.Translation<Point<Ms>>(12),
                collectiveSegnoTime: as.Point<Ms>(1),
                collectiveShareSegnoTime: true,
            })
    })

    it('when the voices do not share a segno time, the collective segno time is the maximum of all the individual ones', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(7),
                    individualRepetendDuration: as.Translation<Point<Ms>>(4),
                    individualSegnoTime: as.Point<Ms>(3),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(5),
                    individualRepetendDuration: as.Translation<Point<Ms>>(3),
                    individualSegnoTime: as.Point<Ms>(2),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: as.Point<Ms>(15),
                collectiveRepetendDuration: as.Translation<Point<Ms>>(12),
                collectiveSegnoTime: as.Point<Ms>(3),
                collectiveShareSegnoTime: false,
            })
    })

    it('when none of the voices repeat forever, the collective end time is the maximum of the individual end times', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(3),
                    individualRepetendDuration: as.Translation<Point<Ms>>(3),
                    individualSegnoTime: as.Point<Ms>(-1),
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(9),
                    individualRepetendDuration: NO_DURATION,
                    individualSegnoTime: as.Point<Ms>(-1),
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: as.Point<Ms>(9),
                collectiveRepetendDuration: as.Translation<Point<Ms>>(-1),
                collectiveSegnoTime: as.Point<Ms>(-1),
                collectiveShareSegnoTime: true,
            })
    })

    it('rounds the durations to prevent skyrocketing collective duration', () => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = [
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(12.999999),
                    individualRepetendDuration: as.Translation<Point<Ms>>(12.999999),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
            {
                voice: IRRELEVANT_VOICE,
                voiceInfo: {
                    individualEndTime: as.Point<Ms>(13.000001),
                    individualRepetendDuration: as.Translation<Point<Ms>>(13.000001),
                    individualSegnoTime: BEGINNING,
                    sectionInfos: [],
                },
            },
        ]

        const collectiveVoiceInfos: CollectiveVoiceInfos = computeCollectiveInfos(individualVoicesAndInfos)

        expect(collectiveVoiceInfos)
            .toEqual({
                collectiveEndTime: as.Point<Ms>(13),
                collectiveRepetendDuration: as.Translation<Point<Ms>>(13),
                collectiveSegnoTime: BEGINNING,
                collectiveShareSegnoTime: true,
            })
    })
})
