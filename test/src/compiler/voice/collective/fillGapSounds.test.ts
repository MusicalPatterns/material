import { as, Duration, musicalAs } from '@musical-patterns/utilities'
import { computeFillGapSounds, Sound } from '../../../../../src/indexForTest'

describe('compute fill gap sounds', () => {
    it('keeps cycling over the repetend sounds until it has filled the gap of duration', () => {
        const repetendSounds: Sound[] = [
            {
                duration: musicalAs.Duration(5),
                frequency: musicalAs.Pitch(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                sustain: musicalAs.Duration(4.9),
            },
            {
                duration: musicalAs.Duration(6),
                frequency: musicalAs.Pitch(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                sustain: musicalAs.Duration(4.9),
            },
        ]
        const gapToBeFilled: Duration = musicalAs.Duration(27)

        const actualSounds: Sound[] = computeFillGapSounds(repetendSounds, gapToBeFilled)

        expect(actualSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(5),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(4.9),
                },
                {
                    duration: musicalAs.Duration(6),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(4.9),
                },
                {
                    duration: musicalAs.Duration(5),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(4.9),
                },
                {
                    duration: musicalAs.Duration(6),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(4.9),
                },
                {
                    duration: musicalAs.Duration(5),
                    frequency: musicalAs.Pitch(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Position(dimension)),
                    sustain: musicalAs.Duration(4.9),
                },
            ])
    })
})
