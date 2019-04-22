// tslint:disable no-any

import { as, Scalar } from '@musical-patterns/utilities'
import {
    as as compilerTo,
    compileSoundFeature,
    CompileSoundsOptions,
    NoteFeature,
    Scale,
    SoundFeature,
} from '../../../../src/indexForTest'

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
        const noteFeature: NoteFeature = {}
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(2))
    })

    it('uses index to choose later notes in the scale', () => {
        const noteFeature: NoteFeature = {
            index: as.Ordinal<Scalar[]>(2),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(8))
    })

    it('uses scale index to switch scales', () => {
        const noteFeature: NoteFeature = {
            scaleIndex: as.Ordinal<Scale[]>(1),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(3))
    })

    it('uses scalar to stretch arbitrarily', () => {
        const noteFeature: NoteFeature = {
            scalar: as.Scalar<Scalar>(1.25),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(2.5))
    })

    it('uses translation to shift around arbitrarily', () => {
        const noteFeature: NoteFeature = {
            translation: as.Translation<Scalar>(0.1),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(2.1))
    })

    it(`defaults to 1 if the scale's scalars are empty`, () => {
        const noteFeature: NoteFeature = {}
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, { scales: [ { scalars: [] } ] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(1))
    })

    it('applies translation from the scale, too', () => {
        const scaleWithTranslation: Scale = {
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const noteFeature: NoteFeature = {}
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, { scales: [ scaleWithTranslation ] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(5))
    })

    it('applies scalar from the scale, too', () => {
        const scaleWithScalar: Scale = {
            scalar: as.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
        }
        const noteFeature: NoteFeature = {}
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, { scales: [ scaleWithScalar ] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(14))
    })

    it('applies scalar first, then translation', () => {
        const noteFeature: NoteFeature = {
            scalar: as.Scalar<Scalar>(1.25),
            translation: as.Translation<Scalar>(0.1),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(2.6))
    })

    it('applies scalar from the scale first, then translation from the scale', () => {
        const noteFeature: NoteFeature = {}
        const scaleWithScalarAndTranslation: Scale = {
            scalar: as.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, { scales: [ scaleWithScalarAndTranslation ] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(17))
    })

    it('can apply translations and scalars from both scale and the note, scalars first', () => {
        const noteFeature: NoteFeature = {
            scalar: as.Scalar<Scalar>(1.25),
            translation: as.Translation<Scalar>(0.1),
        }
        const scaleWithScalarAndTranslation: Scale = {
            scalar: as.Scalar(7),
            scalars: [ 2, 4, 6, 8 ].map(as.Scalar),
            translation: as.Translation(3),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, { scales: [ scaleWithScalarAndTranslation ] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(20.6))
    })

    it('handles empty scales', () => {
        const soundFeature: SoundFeature = compileSoundFeature({}, { scales: [] })

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(1))
    })

    it('handles missing scales', () => {
        const soundFeature: SoundFeature = compileSoundFeature({})

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(1))
    })

    it('rounds, to avoid off by 0.000000000001 errors when comparing patterns compiled on different systems', () => {
        const noteFeature: NoteFeature = {
            translation: as.Translation<Scalar>(0.1239147293578729037982375),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(2.12391))
    })

    it('does not crash when given super tiny numbers', () => {
        const noteFeature: NoteFeature = {
            scalar: as.Scalar<Scalar>(1.000000001e-9),
        }
        const soundFeature: SoundFeature = compileSoundFeature(noteFeature, options)

        expect(soundFeature)
            .toBe(compilerTo.SoundFeature(0))
    })
})
