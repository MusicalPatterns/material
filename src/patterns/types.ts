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

type PitchOnly = 1 & { _PitchOnlyBrand: void }
type ValueOnly = 1 & { _ValueOnlyBrand: void }
type IntensityOnly = 1 & { _IntensityOnlyBrand: void }
type EnvelopeOnly = 1 & { _EnvelopeOnlyBrand: void }
type XOnly = 1 & { _XOnlyBrand: void }
type XYOnly = 2 & { _XYOnlyBrand: void }
type XYZOnly = 3 & { _XYZOnlyBrand: void }
type ScaleOnly = 1 & { _ScaleOnlyBrand: void }
type PitchValue = 2 & { _PitchValueBrand: void }
type PitchIntensity = 2 & { _PitchIntensityBrand: void }
type PitchEnvelope = 2 & { _PitchEnvelopeBrand: void }
type PitchX = 2 & { _PitchXBrand: void }
type PitchXY = 3 & { _PitchXYBrand: void }
type PitchXYZ = 4 & { _PitchXYZBrand: void }
type PitchScale = 2 & { _PitchScaleBrand: void }
type ValueIntensity = 2 & { _ValueIntensityBrand: void }
type ValueEnvelope = 2 & { _ValueEnvelopeBrand: void }
type ValueX = 2 & { _ValueXBrand: void }
type ValueXY = 3 & { _ValueXYBrand: void }
type ValueXYZ = 4 & { _ValueXYZBrand: void }
type ValueScale = 2 & { _ValueScaleBrand: void }
type IntensityEnvelope = 2 & { _IntensityEnvelopeBrand: void }
type IntensityX = 2 & { _IntensityXBrand: void }
type IntensityXY = 3 & { _IntensityXYBrand: void }
type IntensityXYZ = 4 & { _IntensityXYZBrand: void }
type IntensityScale = 2 & { _IntensityScaleBrand: void }
type EnvelopeX = 2 & { _EnvelopeXBrand: void }
type EnvelopeXY = 3 & { _EnvelopeXYBrand: void }
type EnvelopeXYZ = 4 & { _EnvelopeXYZBrand: void }
type EnvelopeScale = 2 & { _EnvelopeScaleBrand: void }
type XScale = 2 & { _XScaleBrand: void }
type XYScale = 3 & { _XYScaleBrand: void }
type XYZScale = 4 & { _XYZScaleBrand: void }
type PitchValueIntensity = 3 & { _PitchValueIntensityBrand: void }
type PitchValueEnvelope = 3 & { _PitchValueEnvelopeBrand: void }
type PitchValueX = 3 & { _PitchValueXBrand: void }
type PitchValueXY = 4 & { _PitchValueXYBrand: void }
type PitchValueXYZ = 5 & { _PitchValueXYZBrand: void }
type PitchValueScale = 3 & { _PitchValueScaleBrand: void }
type PitchIntensityEnvelope = 3 & { _PitchIntensityEnvelopeBrand: void }
type PitchIntensityX = 3 & { _PitchIntensityXBrand: void }
type PitchIntensityXY = 4 & { _PitchIntensityXYBrand: void }
type PitchIntensityXYZ = 5 & { _PitchIntensityXYZBrand: void }
type PitchIntensityScale = 3 & { _PitchIntensityScaleBrand: void }
type PitchEnvelopeX = 3 & { _PitchEnvelopeXBrand: void }
type PitchEnvelopeXY = 4 & { _PitchEnvelopeXYBrand: void }
type PitchEnvelopeXYZ = 5 & { _PitchEnvelopeXYZBrand: void }
type PitchEnvelopeScale = 3 & { _PitchEnvelopeScaleBrand: void }
type PitchXScale = 3 & { _PitchXScaleBrand: void }
type PitchXYScale = 4 & { _PitchXYScaleBrand: void }
type PitchXYZScale = 5 & { _PitchXYZScaleBrand: void }
type ValueIntensityEnvelope = 3 & { _ValueIntensityEnvelopeBrand: void }
type ValueIntensityX = 3 & { _ValueIntensityXBrand: void }
type ValueIntensityXY = 4 & { _ValueIntensityXYBrand: void }
type ValueIntensityXYZ = 5 & { _ValueIntensityXYZBrand: void }
type ValueIntensityScale = 3 & { _ValueIntensityScaleBrand: void }
type ValueXScale = 3 & { _ValueXScaleBrand: void }
type ValueXYScale = 4 & { _ValueXYScaleBrand: void }
type ValueXYZScale = 5 & { _ValueXYZScaleBrand: void }
type IntensityEnvelopeX = 3 & { _IntensityEnvelopeXBrand: void }
type IntensityEnvelopeXY = 4 & { _IntensityEnvelopeXYBrand: void }
type IntensityEnvelopeXYZ = 5 & { _IntensityEnvelopeXYZBrand: void }
type IntensityEnvelopeScale = 3 & { _IntensityEnvelopeScaleBrand: void }
type IntensityXScale = 3 & { _IntensityXScaleBrand: void }
type IntensityXYScale = 4 & { _IntensityXYScaleBrand: void }
type IntensityXYZScale = 5 & { _IntensityXYZScaleBrand: void }
type EnvelopeXScale = 3 & { _EnvelopeXScaleBrand: void }
type EnvelopeXYScale = 4 & { _EnvelopeXYScaleBrand: void }
type EnvelopeXYZScale = 5 & { _EnvelopeXYZScaleBrand: void }
type PitchValueIntensityEnvelope = 4 & { _PitchValueIntensityEnvelopeBrand: void }
type PitchValueIntensityX = 4 & { _PitchValueIntensityXBrand: void }
type PitchValueIntensityXY = 5 & { _PitchValueIntensityXYBrand: void }
type PitchValueIntensityXYZ = 6 & { _PitchValueIntensityXYZBrand: void }
type PitchValueIntensityScale = 4 & { _PitchValueIntensityScaleBrand: void }
type PitchValueEnvelopeX = 4 & { _PitchValueEnvelopeXBrand: void }
type PitchValueEnvelopeXY = 5 & { _PitchValueEnvelopeXYBrand: void }
type PitchValueEnvelopeXYZ = 6 & { _PitchValueEnvelopeXYZBrand: void }
type PitchValueXScale = 4 & { _PitchValueXScale: void }
type PitchValueXYScale = 5 & { _PitchValueXYScale: void }
type PitchValueXYZScale = 6 & { _PitchValueXYZScale: void }
type PitchIntensityEnvelopeX = 4 & { _PitchIntensityEnvelopeXBrand: void }
type PitchIntensityEnvelopeXY = 5 & { _PitchIntensityEnvelopeXYBrand: void }
type PitchIntensityEnvelopeXYZ = 6 & { _PitchIntensityEnvelopeXYZBrand: void }
type PitchIntensityEnvelopeScale = 4 & { _PitchIntensityEnvelopeScaleBrand: void }
type PitchIntensityXScale = 4 & { _PitchIntensityXScaleBrand: void }
type PitchIntensityXYScale = 5 & { _PitchIntensityXYScaleBrand: void }
type PitchIntensityXYZScale = 6 & { _PitchIntensityXYZScaleBrand: void }
type PitchEnvelopeXScale = 4 & { _PitchEnvelopeXScaleBrand: void }
type PitchEnvelopeXYScale = 5 & { _PitchEnvelopeXYScaleBrand: void }
type PitchEnvelopeXYZScale = 6 & { _PitchEnvelopeXYZScaleBrand: void }
type ValueIntensityEnvelopeX = 4 & { _ValueIntensityEnvelopeXBrand: void }
type ValueIntensityEnvelopeXY = 5 & { _ValueIntensityEnvelopeXYBrand: void }
type ValueIntensityEnvelopeXYZ = 6 & { _ValueIntensityEnvelopeXYZBrand: void }
type ValueIntensityEnvelopeScale = 4 & { _ValueIntensityEnvelopeScaleBrand: void }
type ValueIntensityXScale = 4 & { _ValueIntensityXScaleBrand: void }
type ValueIntensityXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type ValueIntensityXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type ValueEnvelopeXScale = 4 & { _ValueIntensityXScaleBrand: void }
type ValueEnvelopeXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type ValueEnvelopeXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type IntensityEnvelopeXScale = 4 & { _ValueIntensityXScaleBrand: void }
type IntensityEnvelopeXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type IntensityEnvelopeXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type PitchValueIntensityEnvelopeX = 5 & { _PitchValueIntensityEnvelopeXBrand: void }
type PitchValueIntensityEnvelopeXY = 6 & { _PitchValueIntensityEnvelopeXYBrand: void }
type PitchValueIntensityEnvelopeXYZ = 7 & { _PitchValueIntensityEnvelopeXYZBrand: void }
type PitchValueIntensityEnvelopeScale = 5 & { _PitchValueIntensityEnvelopeScaleBrand: void }
type PitchValueIntensityXScale = 5 & { _PitchValueIntensityXScaleBrand: void }
type PitchValueIntensityXYScale = 6 & { _PitchValueIntensityXYScaleBrand: void }
type PitchValueIntensityXYZScale = 7 & { _PitchValueIntensityXYZScaleBrand: void }
type PitchValueEnvelopeXScale = 5 & { _PitchValueEnvelopeXScaleBrand: void }
type PitchValueEnvelopeXYScale = 6 & { _PitchValueEnvelopeXYScaleBrand: void }
type PitchValueEnvelopeXYZScale = 7 & { _PitchValueEnvelopeXYZScaleBrand: void }
type PitchIntensityEnvelopeXScale = 5 & { _PitchIntensityEnvelopeXScaleBrand: void }
type PitchIntensityEnvelopeXYScale = 6 & { _PitchIntensityEnvelopeXYScaleBrand: void }
type PitchIntensityEnvelopeXYZScale = 7 & { _PitchIntensityEnvelopeXYZScaleBrand: void }
type ValueIntensityEnvelopeXScale = 5 & { _ValueIntensityEnvelopeXScaleBrand: void }
type ValueIntensityEnvelopeXYScale = 6 & { _ValueIntensityEnvelopeXYScaleBrand: void }
type ValueIntensityEnvelopeXYZScale = 7 & { _ValueIntensityEnvelopeXYZScaleBrand: void }
type PitchValueIntensityEnvelopeXScale = 6 & { _PitchValueIntensityEnvelopeXScaleBrand: void }
type PitchValueIntensityEnvelopeXYScale = 7 & { _PitchValueIntensityEnvelopeXYScaleBrand: void }
type PitchValueIntensityEnvelopeXYZScale = 8 & { _PitchValueIntensityEnvelopeXYZScaleBrand: void }

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
