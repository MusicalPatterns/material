// tslint:disable no-magic-numbers max-file-line-count

import { Block, ContourPiece, Pitch, Scalar, Value } from '@musical-patterns/utilities'
import { Note } from '../compiler'

interface MaterializeStandardScalesOptions {
    pitchScalars?: Array<Scalar<Pitch>>,
    valueScalars?: Array<Scalar<Value>>,
}

type Segment = Note[][]

type Rendering<ContourType> = (block: Block) => ContourPiece<ContourType>

type RenderingByBlockElement<ContourType> = (blockElement: number) => ContourPiece<ContourType>

type PitchOnly = 1 & { _PitchOnlyBrand: unknown }
type ValueOnly = 1 & { _ValueOnlyBrand: unknown }
type IntensityOnly = 1 & { _IntensityOnlyBrand: unknown }
type EnvelopeOnly = 1 & { _EnvelopeOnlyBrand: unknown }
type XOnly = 1 & { _XOnlyBrand: unknown }
type XYOnly = 2 & { _XYOnlyBrand: unknown }
type XYZOnly = 3 & { _XYZOnlyBrand: unknown }
type ScaleOnly = 1 & { _ScaleOnlyBrand: unknown }
type PitchValue = 2 & { _PitchValueBrand: unknown }
type PitchIntensity = 2 & { _PitchIntensityBrand: unknown }
type PitchEnvelope = 2 & { _PitchEnvelopeBrand: unknown }
type PitchX = 2 & { _PitchXBrand: unknown }
type PitchXY = 3 & { _PitchXYBrand: unknown }
type PitchXYZ = 4 & { _PitchXYZBrand: unknown }
type PitchScale = 2 & { _PitchScaleBrand: unknown }
type ValueIntensity = 2 & { _ValueIntensityBrand: unknown }
type ValueEnvelope = 2 & { _ValueEnvelopeBrand: unknown }
type ValueX = 2 & { _ValueXBrand: unknown }
type ValueXY = 3 & { _ValueXYBrand: unknown }
type ValueXYZ = 4 & { _ValueXYZBrand: unknown }
type ValueScale = 2 & { _ValueScaleBrand: unknown }
type IntensityEnvelope = 2 & { _IntensityEnvelopeBrand: unknown }
type IntensityX = 2 & { _IntensityXBrand: unknown }
type IntensityXY = 3 & { _IntensityXYBrand: unknown }
type IntensityXYZ = 4 & { _IntensityXYZBrand: unknown }
type IntensityScale = 2 & { _IntensityScaleBrand: unknown }
type EnvelopeX = 2 & { _EnvelopeXBrand: unknown }
type EnvelopeXY = 3 & { _EnvelopeXYBrand: unknown }
type EnvelopeXYZ = 4 & { _EnvelopeXYZBrand: unknown }
type EnvelopeScale = 2 & { _EnvelopeScaleBrand: unknown }
type XScale = 2 & { _XScaleBrand: unknown }
type XYScale = 3 & { _XYScaleBrand: unknown }
type XYZScale = 4 & { _XYZScaleBrand: unknown }
type PitchValueIntensity = 3 & { _PitchValueIntensityBrand: unknown }
type PitchValueEnvelope = 3 & { _PitchValueEnvelopeBrand: unknown }
type PitchValueX = 3 & { _PitchValueXBrand: unknown }
type PitchValueXY = 4 & { _PitchValueXYBrand: unknown }
type PitchValueXYZ = 5 & { _PitchValueXYZBrand: unknown }
type PitchValueScale = 3 & { _PitchValueScaleBrand: unknown }
type PitchIntensityEnvelope = 3 & { _PitchIntensityEnvelopeBrand: unknown }
type PitchIntensityX = 3 & { _PitchIntensityXBrand: unknown }
type PitchIntensityXY = 4 & { _PitchIntensityXYBrand: unknown }
type PitchIntensityXYZ = 5 & { _PitchIntensityXYZBrand: unknown }
type PitchIntensityScale = 3 & { _PitchIntensityScaleBrand: unknown }
type PitchEnvelopeX = 3 & { _PitchEnvelopeXBrand: unknown }
type PitchEnvelopeXY = 4 & { _PitchEnvelopeXYBrand: unknown }
type PitchEnvelopeXYZ = 5 & { _PitchEnvelopeXYZBrand: unknown }
type PitchEnvelopeScale = 3 & { _PitchEnvelopeScaleBrand: unknown }
type PitchXScale = 3 & { _PitchXScaleBrand: unknown }
type PitchXYScale = 4 & { _PitchXYScaleBrand: unknown }
type PitchXYZScale = 5 & { _PitchXYZScaleBrand: unknown }
type ValueIntensityEnvelope = 3 & { _ValueIntensityEnvelopeBrand: unknown }
type ValueIntensityX = 3 & { _ValueIntensityXBrand: unknown }
type ValueIntensityXY = 4 & { _ValueIntensityXYBrand: unknown }
type ValueIntensityXYZ = 5 & { _ValueIntensityXYZBrand: unknown }
type ValueIntensityScale = 3 & { _ValueIntensityScaleBrand: unknown }
type ValueXScale = 3 & { _ValueXScaleBrand: unknown }
type ValueXYScale = 4 & { _ValueXYScaleBrand: unknown }
type ValueXYZScale = 5 & { _ValueXYZScaleBrand: unknown }
type IntensityEnvelopeX = 3 & { _IntensityEnvelopeXBrand: unknown }
type IntensityEnvelopeXY = 4 & { _IntensityEnvelopeXYBrand: unknown }
type IntensityEnvelopeXYZ = 5 & { _IntensityEnvelopeXYZBrand: unknown }
type IntensityEnvelopeScale = 3 & { _IntensityEnvelopeScaleBrand: unknown }
type IntensityXScale = 3 & { _IntensityXScaleBrand: unknown }
type IntensityXYScale = 4 & { _IntensityXYScaleBrand: unknown }
type IntensityXYZScale = 5 & { _IntensityXYZScaleBrand: unknown }
type EnvelopeXScale = 3 & { _EnvelopeXScaleBrand: unknown }
type EnvelopeXYScale = 4 & { _EnvelopeXYScaleBrand: unknown }
type EnvelopeXYZScale = 5 & { _EnvelopeXYZScaleBrand: unknown }
type PitchValueIntensityEnvelope = 4 & { _PitchValueIntensityEnvelopeBrand: unknown }
type PitchValueIntensityX = 4 & { _PitchValueIntensityXBrand: unknown }
type PitchValueIntensityXY = 5 & { _PitchValueIntensityXYBrand: unknown }
type PitchValueIntensityXYZ = 6 & { _PitchValueIntensityXYZBrand: unknown }
type PitchValueIntensityScale = 4 & { _PitchValueIntensityScaleBrand: unknown }
type PitchValueEnvelopeX = 4 & { _PitchValueEnvelopeXBrand: unknown }
type PitchValueEnvelopeXY = 5 & { _PitchValueEnvelopeXYBrand: unknown }
type PitchValueEnvelopeXYZ = 6 & { _PitchValueEnvelopeXYZBrand: unknown }
type PitchValueXScale = 4 & { _PitchValueXScale: unknown }
type PitchValueXYScale = 5 & { _PitchValueXYScale: unknown }
type PitchValueXYZScale = 6 & { _PitchValueXYZScale: unknown }
type PitchIntensityEnvelopeX = 4 & { _PitchIntensityEnvelopeXBrand: unknown }
type PitchIntensityEnvelopeXY = 5 & { _PitchIntensityEnvelopeXYBrand: unknown }
type PitchIntensityEnvelopeXYZ = 6 & { _PitchIntensityEnvelopeXYZBrand: unknown }
type PitchIntensityEnvelopeScale = 4 & { _PitchIntensityEnvelopeScaleBrand: unknown }
type PitchIntensityXScale = 4 & { _PitchIntensityXScaleBrand: unknown }
type PitchIntensityXYScale = 5 & { _PitchIntensityXYScaleBrand: unknown }
type PitchIntensityXYZScale = 6 & { _PitchIntensityXYZScaleBrand: unknown }
type PitchEnvelopeXScale = 4 & { _PitchEnvelopeXScaleBrand: unknown }
type PitchEnvelopeXYScale = 5 & { _PitchEnvelopeXYScaleBrand: unknown }
type PitchEnvelopeXYZScale = 6 & { _PitchEnvelopeXYZScaleBrand: unknown }
type ValueIntensityEnvelopeX = 4 & { _ValueIntensityEnvelopeXBrand: unknown }
type ValueIntensityEnvelopeXY = 5 & { _ValueIntensityEnvelopeXYBrand: unknown }
type ValueIntensityEnvelopeXYZ = 6 & { _ValueIntensityEnvelopeXYZBrand: unknown }
type ValueIntensityEnvelopeScale = 4 & { _ValueIntensityEnvelopeScaleBrand: unknown }
type ValueIntensityXScale = 4 & { _ValueIntensityXScaleBrand: unknown }
type ValueIntensityXYScale = 5 & { _ValueIntensityXYScaleBrand: unknown }
type ValueIntensityXYZScale = 6 & { _ValueIntensityXYZScaleBrand: unknown }
type ValueEnvelopeXScale = 4 & { _ValueIntensityXScaleBrand: unknown }
type ValueEnvelopeXYScale = 5 & { _ValueIntensityXYScaleBrand: unknown }
type ValueEnvelopeXYZScale = 6 & { _ValueIntensityXYZScaleBrand: unknown }
type IntensityEnvelopeXScale = 4 & { _ValueIntensityXScaleBrand: unknown }
type IntensityEnvelopeXYScale = 5 & { _ValueIntensityXYScaleBrand: unknown }
type IntensityEnvelopeXYZScale = 6 & { _ValueIntensityXYZScaleBrand: unknown }
type PitchValueIntensityEnvelopeX = 5 & { _PitchValueIntensityEnvelopeXBrand: unknown }
type PitchValueIntensityEnvelopeXY = 6 & { _PitchValueIntensityEnvelopeXYBrand: unknown }
type PitchValueIntensityEnvelopeXYZ = 7 & { _PitchValueIntensityEnvelopeXYZBrand: unknown }
type PitchValueIntensityEnvelopeScale = 5 & { _PitchValueIntensityEnvelopeScaleBrand: unknown }
type PitchValueIntensityXScale = 5 & { _PitchValueIntensityXScaleBrand: unknown }
type PitchValueIntensityXYScale = 6 & { _PitchValueIntensityXYScaleBrand: unknown }
type PitchValueIntensityXYZScale = 7 & { _PitchValueIntensityXYZScaleBrand: unknown }
type PitchValueEnvelopeXScale = 5 & { _PitchValueEnvelopeXScaleBrand: unknown }
type PitchValueEnvelopeXYScale = 6 & { _PitchValueEnvelopeXYScaleBrand: unknown }
type PitchValueEnvelopeXYZScale = 7 & { _PitchValueEnvelopeXYZScaleBrand: unknown }
type PitchIntensityEnvelopeXScale = 5 & { _PitchIntensityEnvelopeXScaleBrand: unknown }
type PitchIntensityEnvelopeXYScale = 6 & { _PitchIntensityEnvelopeXYScaleBrand: unknown }
type PitchIntensityEnvelopeXYZScale = 7 & { _PitchIntensityEnvelopeXYZScaleBrand: unknown }
type ValueIntensityEnvelopeXScale = 5 & { _ValueIntensityEnvelopeXScaleBrand: unknown }
type ValueIntensityEnvelopeXYScale = 6 & { _ValueIntensityEnvelopeXYScaleBrand: unknown }
type ValueIntensityEnvelopeXYZScale = 7 & { _ValueIntensityEnvelopeXYZScaleBrand: unknown }
type PitchValueIntensityEnvelopeXScale = 6 & { _PitchValueIntensityEnvelopeXScaleBrand: unknown }
type PitchValueIntensityEnvelopeXYScale = 7 & { _PitchValueIntensityEnvelopeXYScaleBrand: unknown }
type PitchValueIntensityEnvelopeXYZScale = 8 & { _PitchValueIntensityEnvelopeXYZScaleBrand: unknown }

export {
    MaterializeStandardScalesOptions,
    Segment,
    Rendering,
    RenderingByBlockElement,
    PitchOnly,
    ValueOnly,
    IntensityOnly,
    EnvelopeOnly,
    XOnly,
    XYOnly,
    XYZOnly,
    ScaleOnly,
    PitchValue,
    PitchIntensity,
    PitchEnvelope,
    PitchX,
    PitchXY,
    PitchXYZ,
    PitchScale,
    ValueIntensity,
    ValueEnvelope,
    ValueX,
    ValueXY,
    ValueXYZ,
    ValueScale,
    IntensityEnvelope,
    IntensityX,
    IntensityXY,
    IntensityXYZ,
    IntensityScale,
    EnvelopeX,
    EnvelopeXY,
    EnvelopeXYZ,
    EnvelopeScale,
    XScale,
    XYScale,
    XYZScale,
    PitchValueIntensity,
    PitchValueEnvelope,
    PitchValueX,
    PitchValueXY,
    PitchValueXYZ,
    PitchValueScale,
    PitchIntensityEnvelope,
    PitchIntensityX,
    PitchIntensityXY,
    PitchIntensityXYZ,
    PitchIntensityScale,
    PitchEnvelopeX,
    PitchEnvelopeXY,
    PitchEnvelopeXYZ,
    PitchEnvelopeScale,
    PitchXScale,
    PitchXYScale,
    PitchXYZScale,
    ValueIntensityEnvelope,
    ValueIntensityX,
    ValueIntensityXY,
    ValueIntensityXYZ,
    ValueIntensityScale,
    ValueXScale,
    ValueXYScale,
    ValueXYZScale,
    IntensityEnvelopeX,
    IntensityEnvelopeXY,
    IntensityEnvelopeXYZ,
    IntensityEnvelopeScale,
    IntensityXScale,
    IntensityXYScale,
    IntensityXYZScale,
    EnvelopeXScale,
    EnvelopeXYScale,
    EnvelopeXYZScale,
    PitchValueIntensityEnvelope,
    PitchValueIntensityX,
    PitchValueIntensityXY,
    PitchValueIntensityXYZ,
    PitchValueIntensityScale,
    PitchValueEnvelopeX,
    PitchValueEnvelopeXY,
    PitchValueEnvelopeXYZ,
    PitchValueXScale,
    PitchValueXYScale,
    PitchValueXYZScale,
    PitchIntensityEnvelopeX,
    PitchIntensityEnvelopeXY,
    PitchIntensityEnvelopeXYZ,
    PitchIntensityEnvelopeScale,
    PitchIntensityXScale,
    PitchIntensityXYScale,
    PitchIntensityXYZScale,
    PitchEnvelopeXScale,
    PitchEnvelopeXYScale,
    PitchEnvelopeXYZScale,
    ValueIntensityEnvelopeX,
    ValueIntensityEnvelopeXY,
    ValueIntensityEnvelopeXYZ,
    ValueIntensityEnvelopeScale,
    ValueIntensityXScale,
    ValueIntensityXYScale,
    ValueIntensityXYZScale,
    ValueEnvelopeXScale,
    ValueEnvelopeXYScale,
    ValueEnvelopeXYZScale,
    IntensityEnvelopeXScale,
    IntensityEnvelopeXYScale,
    IntensityEnvelopeXYZScale,
    PitchValueIntensityEnvelopeX,
    PitchValueIntensityEnvelopeXY,
    PitchValueIntensityEnvelopeXYZ,
    PitchValueIntensityEnvelopeScale,
    PitchValueIntensityXScale,
    PitchValueIntensityXYScale,
    PitchValueIntensityXYZScale,
    PitchValueEnvelopeXScale,
    PitchValueEnvelopeXYScale,
    PitchValueEnvelopeXYZScale,
    PitchIntensityEnvelopeXScale,
    PitchIntensityEnvelopeXYScale,
    PitchIntensityEnvelopeXYZScale,
    ValueIntensityEnvelopeXScale,
    ValueIntensityEnvelopeXYScale,
    ValueIntensityEnvelopeXYZScale,
    PitchValueIntensityEnvelopeXScale,
    PitchValueIntensityEnvelopeXYScale,
    PitchValueIntensityEnvelopeXYZScale,
}
