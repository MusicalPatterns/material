import { Duration, musicalAs } from '@musical-patterns/utilities'
import { computeFillGapSounds, Sound } from '../../../../../src/indexForTest'

describe('compute fill gap sounds', () => {
    it('keeps cycling over the repetend sounds until it has filled the gap of duration', () => {
        const repetendSounds: Sound[] = [
            {
                duration: musicalAs.Duration(5),
                gain: musicalAs.Gain(1),
                location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                sustain: musicalAs.Duration(4.9),
                tone: musicalAs.Tone(1),
            },
            {
                duration: musicalAs.Duration(6),
                gain: musicalAs.Gain(1),
                location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                sustain: musicalAs.Duration(4.9),
                tone: musicalAs.Tone(1),
            },
        ]
        const gapToBeFilled: Duration = musicalAs.Duration(27)

        const actualSounds: Sound[] = computeFillGapSounds(repetendSounds, gapToBeFilled)

        expect(actualSounds)
            .toEqual([
                {
                    duration: musicalAs.Duration(5),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(4.9),
                    tone: musicalAs.Tone(1),
                },
                {
                    duration: musicalAs.Duration(6),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(4.9),
                    tone: musicalAs.Tone(1),
                },
                {
                    duration: musicalAs.Duration(5),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(4.9),
                    tone: musicalAs.Tone(1),
                },
                {
                    duration: musicalAs.Duration(6),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(4.9),
                    tone: musicalAs.Tone(1),
                },
                {
                    duration: musicalAs.Duration(5),
                    gain: musicalAs.Gain(1),
                    location: [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(4.9),
                    tone: musicalAs.Tone(1),
                },
            ])
    })
})
