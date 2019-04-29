// tslint:disable no-any

import { as, musicalAs, Pitch, Scalar } from '@musical-patterns/utilities'
import { compileSoundFeature, CompileSoundsOptions, Feature, Scale } from '../../../../src/indexForTest'

describe('compile sound feature', () => {
    let scales: Scale[]
    let options: CompileSoundsOptions
    beforeEach(() => {
        scales = [
            {
                scalars: [ 2, 4, 8, 16 ].map(as.Scalar),
            },
            {
                scalars: [ 3, 9, 27, 81 ].map(as.Scalar),
            },
        ]
        options = { scales }
    })

    it('defaults scale index to zero, index to zero, translation to zero, and scalar to zero', () => {
        const noteFeature: Feature = {}
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(2)
    })

    it('uses index to choose later notes in the scale', () => {
        const noteFeature: Feature = {
            index: as.Ordinal<Scalar[]>(2),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(8)
    })

    it('uses scale index to switch scales', () => {
        const noteFeature: Feature = {
            scaleIndex: as.Ordinal<Scale[]>(1),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(3)
    })

    it('uses scalar to stretch arbitrarily', () => {
        const noteFeature: Feature = {
            scalar: as.Scalar(1.25),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(2.5)
    })

    it('uses translation to shift around arbitrarily', () => {
        const noteFeature: Feature = {
            translation: as.Translation(0.1),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(2.1)
    })

    it(`defaults to 1 if the scale's scalars are empty`, () => {
        const noteFeature: Feature = {}
        const soundFeature: number = compileSoundFeature(noteFeature, { scales: [ { scalars: [] } ] })

        expect(soundFeature)
            .toBe(1)
    })

    it('applies translation from the scale, too', () => {
        const scaleWithTranslation: Scale = {
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const noteFeature: Feature = {}
        const soundFeature: number = compileSoundFeature(noteFeature, { scales: [ scaleWithTranslation ] })

        expect(soundFeature)
            .toBe(5)
    })

    it('applies scalar from the scale, too', () => {
        const scaleWithScalar: Scale = {
            basis: 7,
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
        }
        const noteFeature: Feature = {}
        const soundFeature: number = compileSoundFeature(noteFeature, { scales: [ scaleWithScalar ] })

        expect(soundFeature)
            .toBe(14)
    })

    it('applies scalar first, then translation', () => {
        const noteFeature: Feature = {
            scalar: as.Scalar(1.25),
            translation: as.Translation(0.1),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(2.6)
    })

    it('applies scalar from the scale first, then translation from the scale', () => {
        const noteFeature: Feature = {}
        const scaleWithScalarAndTranslation: Scale = {
            basis: 7,
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, { scales: [ scaleWithScalarAndTranslation ] })

        expect(soundFeature)
            .toBe(17)
    })

    it('can apply translations and scalars from both scale and the note, scalars first', () => {
        const noteFeature: Feature = {
            scalar: as.Scalar(1.25),
            translation: as.Translation(0.1),
        }
        const scaleWithScalarAndTranslation: Scale = {
            basis: 7,
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, { scales: [ scaleWithScalarAndTranslation ] })

        expect(soundFeature)
            .toBe(20.6)
    })

    it('handles empty scales', () => {
        const soundFeature: number = compileSoundFeature({}, { scales: [] })

        expect(soundFeature)
            .toBe(1)
    })

    it('handles missing scales', () => {
        const soundFeature: number = compileSoundFeature({})

        expect(soundFeature)
            .toBe(1)
    })

    it('rounds, to avoid off by 0.000000000001 errors when comparing patterns compiled on different systems', () => {
        const noteFeature: Feature = {
            translation: as.Translation(0.1239147293578729037982375),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(2.12391)
    })

    it('does not crash when given super tiny numbers', () => {
        const noteFeature: Feature = {
            scalar: as.Scalar(1.000000001e-9),
        }
        const soundFeature: number = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(0)
    })

    it('detects the type of the feature', () => {
        const noteFeature: Feature<Pitch> = {
            scalar: as.Scalar<Pitch>(1.25),
            translation: as.Translation<Pitch>(0.1),
        }
        const scaleWithScalarAndTranslation: Scale<Pitch> = {
            basis: musicalAs.Pitch(7),
            scalars: [ 2, 4, 6, 8 ].map((scalar: number) => as.Scalar<Pitch>(scalar)),
            translation: as.Translation<Pitch>(3),
        }
        const soundFeature: Pitch = compileSoundFeature(noteFeature, { scales: [ scaleWithScalarAndTranslation ] })

        expect(soundFeature)
            .toBe(musicalAs.Pitch(20.6))
    })
})
