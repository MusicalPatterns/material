import { as, Duration, Hz, Meters, Ms } from '@musical-patterns/utilities'
import { computeFillGapSounds, Sound } from '../../../../../src/indexForTest'

describe('compute fill gap sounds', () => {
    it('keeps cycling over the repetend sounds until it has filled the gap of duration', () => {
        const repetendSounds: Sound[] = [
            {
                duration: as.Delta<Ms>(5),
                frequency: as.Point<Hz>(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                sustain: as.Delta<Ms>(4.9),
            },
            {
                duration: as.Delta<Ms>(6),
                frequency: as.Point<Hz>(1),
                gain: as.Gain(1),
                position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                sustain: as.Delta<Ms>(4.9),
            },
        ]
        const gapToBeFilled: Duration = as.Delta<Ms>(27)

        const actualSounds: Sound[] = computeFillGapSounds(repetendSounds, gapToBeFilled)

        expect(actualSounds)
            .toEqual([
                {
                    duration: as.Delta<Ms>(5),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Delta<Ms>(4.9),
                },
                {
                    duration: as.Delta<Ms>(6),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Delta<Ms>(4.9),
                },
                {
                    duration: as.Delta<Ms>(5),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Delta<Ms>(4.9),
                },
                {
                    duration: as.Delta<Ms>(6),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Delta<Ms>(4.9),
                },
                {
                    duration: as.Delta<Ms>(5),
                    frequency: as.Point<Hz>(1),
                    gain: as.Gain(1),
                    position: [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
                    sustain: as.Delta<Ms>(4.9),
                },
            ])
    })
})
