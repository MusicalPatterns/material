// tslint:disable no-any

import { as, musicalAs, Pitch, Scalar, Tone } from '@musical-patterns/utilities'
import {
    AbstractName,
    compileSoundFeature,
    CompileSoundsOptions,
    Feature,
    Scale,
    Scales,
} from '../../../../src/indexForTest'

describe('compile feature', (): void => {
    let scales: Scales
    let options: CompileSoundsOptions
    beforeEach((): void => {
        scales = {
            [ AbstractName.PITCH ]: [
                {
                    scalars: [ 2, 4, 8, 16 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
                },
                {
                    scalars: [ 3, 9, 27, 81 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
                },
            ],
        }
        options = { scales }
    })

    it('defaults scale index to zero, index to zero, translation to zero, and scalar to zero', (): void => {
        const noteFeature: Feature<Pitch> = {}
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(2))
    })

    it('uses index to choose later notes in the scale', (): void => {
        const noteFeature: Feature<Pitch> = {
            index: as.Ordinal<Array<Scalar<Pitch>>>(2),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(8))
    })

    it('uses scale index to switch scales', (): void => {
        const noteFeature: Feature<Pitch> = {
            scaleIndex: as.Ordinal<Array<Scale<Pitch>>>(1),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(3))
    })

    it('uses scalar to stretch arbitrarily', (): void => {
        const noteFeature: Feature<Pitch> = {
            scalar: as.Scalar<Pitch>(1.25),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(2.5))
    })

    it('uses translation to shift around arbitrarily', (): void => {
        const noteFeature: Feature<Pitch> = {
            translation: as.Translation<Pitch>(0.1),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(2.1))
    })

    it(`defaults to 1 if the scale's scalars are empty`, (): void => {
        const noteFeature: Feature<Pitch> = {}
        const soundFeature: Tone = compileSoundFeature(
            noteFeature,
            AbstractName.PITCH,
            { scales: { [ AbstractName.PITCH ]: [ { scalars: [] } ] } },
        )

        expect(soundFeature)
            .toBe(musicalAs.Tone(1))
    })

    it('applies translation from the scale, too', (): void => {
        const scaleWithTranslation: Scale<Pitch> = {
            scalars: [ 2, 4, 6, 8 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
            translation: as.Translation<Tone>(3),
        }
        const noteFeature: Feature<Pitch> = {}
        const soundFeature: Tone = compileSoundFeature(
            noteFeature,
            AbstractName.PITCH,
            { scales: { [ AbstractName.PITCH ]: [ scaleWithTranslation ] } },
        )

        expect(soundFeature)
            .toBe(musicalAs.Tone(5))
    })

    it('applies scalar from the scale, too', (): void => {
        const scaleWithScalar: Scale<Pitch> = {
            basis: musicalAs.Tone(7),
            scalars: [ 2, 4, 6, 8 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
        }
        const noteFeature: Feature<Pitch> = {}
        const soundFeature: Tone = compileSoundFeature(
            noteFeature,
            AbstractName.PITCH,
            { scales: { [ AbstractName.PITCH ]: [ scaleWithScalar ] } },
        )

        expect(soundFeature)
            .toBe(musicalAs.Tone(14))
    })

    it('applies scalar first, then translation', (): void => {
        const noteFeature: Feature<Pitch> = {
            scalar: as.Scalar<Pitch>(1.25),
            translation: as.Translation<Pitch>(0.1),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(2.6))
    })

    it('applies scalar from the scale first, then translation from the scale', (): void => {
        const noteFeature: Feature<Pitch> = {}
        const scaleWithScalarAndTranslation: Scale<Pitch> = {
            basis: musicalAs.Tone(7),
            scalars: [ 2, 4, 6, 8 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
            translation: as.Translation<Tone>(3),
        }
        const soundFeature: Tone = compileSoundFeature(
            noteFeature,
            AbstractName.PITCH,
            { scales: { [ AbstractName.PITCH ]: [ scaleWithScalarAndTranslation ] } },
        )

        expect(soundFeature)
            .toBe(musicalAs.Tone(17))
    })

    it('can apply translations and scalars from both scale and the note, scalars first', (): void => {
        const noteFeature: Feature<Pitch> = {
            scalar: as.Scalar<Pitch>(1.25),
            translation: as.Translation<Pitch>(0.1),
        }
        const scaleWithScalarAndTranslation: Scale<Pitch> = {
            basis: musicalAs.Tone(7),
            scalars: [ 2, 4, 6, 8 ].map((numeral: number): Scalar<Pitch> => as.Scalar<Pitch>(numeral)),
            translation: as.Translation<Tone>(3),
        }
        const soundFeature: Tone = compileSoundFeature(
            noteFeature,
            AbstractName.PITCH,
            { scales: { [ AbstractName.PITCH ]: [ scaleWithScalarAndTranslation ] } },
        )

        expect(soundFeature)
            .toBe(musicalAs.Tone(20.6))
    })

    it('handles empty scales', (): void => {
        const soundFeature: Tone = compileSoundFeature<Pitch>({}, AbstractName.PITCH, { scales: {} })

        expect(soundFeature)
            .toBe(musicalAs.Tone(1))
    })

    it('handles missing scales', (): void => {
        const soundFeature: Tone = compileSoundFeature<Pitch>({}, AbstractName.PITCH)

        expect(soundFeature)
            .toBe(musicalAs.Tone(1))
    })

    it('rounds, to avoid off by 0.000000000001 errors when comparing patterns compiled on different systems', (): void => {
        const noteFeature: Feature<Pitch> = {
            translation: as.Translation<Pitch>(0.1239147293578729037982375),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(2.12391))
    })

    it('does not crash when given super tiny numbers', (): void => {
        const noteFeature: Feature<Pitch> = {
            scalar: as.Scalar<Pitch>(1.000000001e-9),
        }
        const soundFeature: Tone = compileSoundFeature(noteFeature, AbstractName.PITCH, options)

        expect(soundFeature)
            .toBe(musicalAs.Tone(0))
    })
})
