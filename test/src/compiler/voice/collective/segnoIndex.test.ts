import { as, Location, Ms, musicalAs, NO_DURATION, Ordinal, Point, repeat } from '@musical-patterns/utilities'
import {
    computeSegnoIndex,
    NON_SEGNO_INDEX,
    OscillatorName,
    Sound,
    SourceType,
    TEMPORARY_UNDEFINED_SEGNO_INDEX,
    Voice,
} from '../../../../../src/indexForTest'

describe('compute segno index', (): void => {
    const collectiveSegnoTime: Point<Ms> = as.Point<Ms>(44)
    const voice: Voice = {
        delay: NO_DURATION,
        segnoIndex: TEMPORARY_UNDEFINED_SEGNO_INDEX,
        sounds: repeat(
            [
                {
                    duration: musicalAs.Duration(20),
                    gain: musicalAs.Gain(1),
                    location: [ 0 ].map((dimension: number): Location => musicalAs.Location(dimension)),
                    sustain: musicalAs.Duration(9),
                    tone: musicalAs.Tone(1),
                },
            ],
            as.Cardinal<Sound[]>(5),
        ),
        sourceRequest: {
            sourceType: SourceType.OSCILLATOR,
            timbreName: OscillatorName.SINE,
        },
    }
    let individualSegnoTime: Point<Ms>

    describe('when the voice has no repetend', (): void => {
        beforeEach((): void => {
            individualSegnoTime = as.Point<Ms>(-1)
        })

        it('it returns the non-segno-index which will tell the performer not to repeat it', (): void => {
            const actualSegnoIndex: Ordinal<Sound[]> = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice,
            })

            expect(actualSegnoIndex)
                .toBe(NON_SEGNO_INDEX)
        })
    })

    describe('when the voice does have a repetend', (): void => {
        beforeEach((): void => {
            const SOME_REALISTIC_BUT_MOSTLY_ARBITRARY_INDIVIDUAL_SEGNO_TIME: Point<Ms> = as.Point<Ms>(60)
            individualSegnoTime = SOME_REALISTIC_BUT_MOSTLY_ARBITRARY_INDIVIDUAL_SEGNO_TIME
        })

        it('returns the first index of the voice sounds after the collective segno time', (): void => {
            const actualSegnoIndex: Ordinal<Sound[]> = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice,
            })

            expect(actualSegnoIndex)
                .toBe(as.Ordinal<Sound[]>(3))
        })
    })

    describe('when the voice has no sounds', (): void => {
        beforeEach((): void => {
            const ANY_SEGNO_TIME_OTHER_THAN_NON_SEGNO_TIME: Point<Ms> = as.Point<Ms>(35)
            individualSegnoTime = ANY_SEGNO_TIME_OTHER_THAN_NON_SEGNO_TIME
        })

        it('returns the non segno index', (): void => {
            const actualSegnoIndex: Ordinal<Sound[]> = computeSegnoIndex({
                collectiveSegnoTime,
                individualSegnoTime,
                voice: {
                    delay: NO_DURATION,
                    segnoIndex: TEMPORARY_UNDEFINED_SEGNO_INDEX,
                    sounds: [],
                    sourceRequest: {
                        sourceType: SourceType.OSCILLATOR,
                        timbreName: OscillatorName.SINE,
                    },
                },
            })

            expect(actualSegnoIndex)
                .toBe(as.Ordinal<Sound[]>(-1))
        })
    })
})
