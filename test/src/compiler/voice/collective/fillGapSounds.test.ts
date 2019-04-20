import { Amplitude, as, Ms } from '@musical-patterns/utilities'
import { computeFillGapSounds, Sound } from '../../../../../src/indexForTest'

describe('compute fill gap sounds', () => {
    it('keeps cycling over the repetend sounds until it has filled the gap of duration', () => {
        const repetendSounds: Sound[] = [
            {
                duration: as.Ms(5),
                frequency: as.Hz(1),
                gain: as.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(as.Meters),
                sustain: as.Ms(4.9),
            },
            {
                duration: as.Ms(6),
                frequency: as.Hz(1),
                gain: as.NormalScalar<Amplitude>(1),
                position: [ 0, 0, 0 ].map(as.Meters),
                sustain: as.Ms(4.9),
            },
        ]
        const gapToBeFilled: Ms = as.Ms(27)

        const actualSounds: Sound[] = computeFillGapSounds(repetendSounds, gapToBeFilled)

        expect(actualSounds)
            .toEqual([
                {
                    duration: as.Ms(5),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Ms(4.9),
                },
                {
                    duration: as.Ms(6),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Ms(4.9),
                },
                {
                    duration: as.Ms(5),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Ms(4.9),
                },
                {
                    duration: as.Ms(6),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Ms(4.9),
                },
                {
                    duration: as.Ms(5),
                    frequency: as.Hz(1),
                    gain: as.NormalScalar<Amplitude>(1),
                    position: [ 0, 0, 0 ].map(as.Meters),
                    sustain: as.Ms(4.9),
                },
            ])
    })
})
