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
type SustainOnly = 1 & { _SustainOnlyBrand: void }
type XOnly = 1 & { _XOnlyBrand: void }
type XYOnly = 2 & { _XYOnlyBrand: void }
type XYZOnly = 3 & { _XYZOnlyBrand: void }
type ScaleOnly = 1 & { _ScaleOnlyBrand: void }
type PitchValue = 2 & { _PitchValueBrand: void }
type PitchIntensity = 2 & { _PitchIntensityBrand: void }
type PitchSustain = 2 & { _PitchSustainBrand: void }
type PitchX = 2 & { _PitchXBrand: void }
type PitchXY = 3 & { _PitchXYBrand: void }
type PitchXYZ = 4 & { _PitchXYZBrand: void }
type PitchScale = 2 & { _PitchScaleBrand: void }
type ValueIntensity = 2 & { _ValueIntensityBrand: void }
type ValueSustain = 2 & { _ValueSustainBrand: void }
type ValueX = 2 & { _ValueXBrand: void }
type ValueXY = 3 & { _ValueXYBrand: void }
type ValueXYZ = 4 & { _ValueXYZBrand: void }
type ValueScale = 2 & { _ValueScaleBrand: void }
type IntensitySustain = 2 & { _IntensitySustainBrand: void }
type IntensityX = 2 & { _IntensityXBrand: void }
type IntensityXY = 3 & { _IntensityXYBrand: void }
type IntensityXYZ = 4 & { _IntensityXYZBrand: void }
type IntensityScale = 2 & { _IntensityScaleBrand: void }
type SustainX = 2 & { _SustainXBrand: void }
type SustainXY = 3 & { _SustainXYBrand: void }
type SustainXYZ = 4 & { _SustainXYZBrand: void }
type SustainScale = 2 & { _SustainScaleBrand: void }
type XScale = 2 & { _XScaleBrand: void }
type XYScale = 3 & { _XYScaleBrand: void }
type XYZScale = 4 & { _XYZScaleBrand: void }
type PitchValueIntensity = 3 & { _PitchValueIntensityBrand: void }
type PitchValueSustain = 3 & { _PitchValueSustainBrand: void }
type PitchValueX = 3 & { _PitchValueXBrand: void }
type PitchValueXY = 4 & { _PitchValueXYBrand: void }
type PitchValueXYZ = 5 & { _PitchValueXYZBrand: void }
type PitchValueScale = 3 & { _PitchValueScaleBrand: void }
type PitchIntensitySustain = 3 & { _PitchIntensitySustainBrand: void }
type PitchIntensityX = 3 & { _PitchIntensityXBrand: void }
type PitchIntensityXY = 4 & { _PitchIntensityXYBrand: void }
type PitchIntensityXYZ = 5 & { _PitchIntensityXYZBrand: void }
type PitchIntensityScale = 3 & { _PitchIntensityScaleBrand: void }
type PitchSustainX = 3 & { _PitchSustainXBrand: void }
type PitchSustainXY = 4 & { _PitchSustainXYBrand: void }
type PitchSustainXYZ = 5 & { _PitchSustainXYZBrand: void }
type PitchSustainScale = 3 & { _PitchSustainScaleBrand: void }
type PitchXScale = 3 & { _PitchXScaleBrand: void }
type PitchXYScale = 4 & { _PitchXYScaleBrand: void }
type PitchXYZScale = 5 & { _PitchXYZScaleBrand: void }
type ValueIntensitySustain = 3 & { _ValueIntensitySustainBrand: void }
type ValueIntensityX = 3 & { _ValueIntensityXBrand: void }
type ValueIntensityXY = 4 & { _ValueIntensityXYBrand: void }
type ValueIntensityXYZ = 5 & { _ValueIntensityXYZBrand: void }
type ValueIntensityScale = 3 & { _ValueIntensityScaleBrand: void }
type ValueXScale = 3 & { _ValueXScaleBrand: void }
type ValueXYScale = 4 & { _ValueXYScaleBrand: void }
type ValueXYZScale = 5 & { _ValueXYZScaleBrand: void }
type IntensitySustainX = 3 & { _IntensitySustainXBrand: void }
type IntensitySustainXY = 4 & { _IntensitySustainXYBrand: void }
type IntensitySustainXYZ = 5 & { _IntensitySustainXYZBrand: void }
type IntensitySustainScale = 3 & { _IntensitySustainScaleBrand: void }
type IntensityXScale = 3 & { _IntensityXScaleBrand: void }
type IntensityXYScale = 4 & { _IntensityXYScaleBrand: void }
type IntensityXYZScale = 5 & { _IntensityXYZScaleBrand: void }
type SustainXScale = 3 & { _SustainXScaleBrand: void }
type SustainXYScale = 4 & { _SustainXYScaleBrand: void }
type SustainXYZScale = 5 & { _SustainXYZScaleBrand: void }
type PitchValueIntensitySustain = 4 & { _PitchValueIntensitySustainBrand: void }
type PitchValueIntensityX = 4 & { _PitchValueIntensityXBrand: void }
type PitchValueIntensityXY = 5 & { _PitchValueIntensityXYBrand: void }
type PitchValueIntensityXYZ = 6 & { _PitchValueIntensityXYZBrand: void }
type PitchValueIntensityScale = 4 & { _PitchValueIntensityScaleBrand: void }
type PitchValueSustainX = 4 & { _PitchValueSustainXBrand: void }
type PitchValueSustainXY = 5 & { _PitchValueSustainXYBrand: void }
type PitchValueSustainXYZ = 6 & { _PitchValueSustainXYZBrand: void }
type PitchValueXScale = 4 & { _PitchValueXScale: void }
type PitchValueXYScale = 5 & { _PitchValueXYScale: void }
type PitchValueXYZScale = 6 & { _PitchValueXYZScale: void }
type PitchIntensitySustainX = 4 & { _PitchIntensitySustainXBrand: void }
type PitchIntensitySustainXY = 5 & { _PitchIntensitySustainXYBrand: void }
type PitchIntensitySustainXYZ = 6 & { _PitchIntensitySustainXYZBrand: void }
type PitchIntensitySustainScale = 4 & { _PitchIntensitySustainScaleBrand: void }
type PitchIntensityXScale = 4 & { _PitchIntensityXScaleBrand: void }
type PitchIntensityXYScale = 5 & { _PitchIntensityXYScaleBrand: void }
type PitchIntensityXYZScale = 6 & { _PitchIntensityXYZScaleBrand: void }
type PitchSustainXScale = 4 & { _PitchSustainXScaleBrand: void }
type PitchSustainXYScale = 5 & { _PitchSustainXYScaleBrand: void }
type PitchSustainXYZScale = 6 & { _PitchSustainXYZScaleBrand: void }
type ValueIntensitySustainX = 4 & { _ValueIntensitySustainXBrand: void }
type ValueIntensitySustainXY = 5 & { _ValueIntensitySustainXYBrand: void }
type ValueIntensitySustainXYZ = 6 & { _ValueIntensitySustainXYZBrand: void }
type ValueIntensitySustainScale = 4 & { _ValueIntensitySustainScaleBrand: void }
type ValueIntensityXScale = 4 & { _ValueIntensityXScaleBrand: void }
type ValueIntensityXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type ValueIntensityXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type ValueSustainXScale = 4 & { _ValueIntensityXScaleBrand: void }
type ValueSustainXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type ValueSustainXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type IntensitySustainXScale = 4 & { _ValueIntensityXScaleBrand: void }
type IntensitySustainXYScale = 5 & { _ValueIntensityXYScaleBrand: void }
type IntensitySustainXYZScale = 6 & { _ValueIntensityXYZScaleBrand: void }
type PitchValueIntensitySustainX = 5 & { _PitchValueIntensitySustainXBrand: void }
type PitchValueIntensitySustainXY = 6 & { _PitchValueIntensitySustainXYBrand: void }
type PitchValueIntensitySustainXYZ = 7 & { _PitchValueIntensitySustainXYZBrand: void }
type PitchValueIntensitySustainScale = 5 & { _PitchValueIntensitySustainScaleBrand: void }
type PitchValueIntensityXScale = 5 & { _PitchValueIntensityXScaleBrand: void }
type PitchValueIntensityXYScale = 6 & { _PitchValueIntensityXYScaleBrand: void }
type PitchValueIntensityXYZScale = 7 & { _PitchValueIntensityXYZScaleBrand: void }
type PitchValueSustainXScale = 5 & { _PitchValueSustainXScaleBrand: void }
type PitchValueSustainXYScale = 6 & { _PitchValueSustainXYScaleBrand: void }
type PitchValueSustainXYZScale = 7 & { _PitchValueSustainXYZScaleBrand: void }
type PitchIntensitySustainXScale = 5 & { _PitchIntensitySustainXScaleBrand: void }
type PitchIntensitySustainXYScale = 6 & { _PitchIntensitySustainXYScaleBrand: void }
type PitchIntensitySustainXYZScale = 7 & { _PitchIntensitySustainXYZScaleBrand: void }
type ValueIntensitySustainXScale = 5 & { _ValueIntensitySustainXScaleBrand: void }
type ValueIntensitySustainXYScale = 6 & { _ValueIntensitySustainXYScaleBrand: void }
type ValueIntensitySustainXYZScale = 7 & { _ValueIntensitySustainXYZScaleBrand: void }
type PitchValueIntensitySustainXScale = 6 & { _PitchValueIntensitySustainXScaleBrand: void }
type PitchValueIntensitySustainXYScale = 7 & { _PitchValueIntensitySustainXYScaleBrand: void }
type PitchValueIntensitySustainXYZScale = 8 & { _PitchValueIntensitySustainXYZScaleBrand: void }

export {
    MaterializeStandardScalesOptions,
    Segment,
    Rendering,
    RenderingByBlockElement,
    PitchOnly,
    ValueOnly,
    IntensityOnly,
    SustainOnly,
    XOnly,
    XYOnly,
    XYZOnly,
    ScaleOnly,
    PitchValue,
    PitchIntensity,
    PitchSustain,
    PitchX,
    PitchXY,
    PitchXYZ,
    PitchScale,
    ValueIntensity,
    ValueSustain,
    ValueX,
    ValueXY,
    ValueXYZ,
    ValueScale,
    IntensitySustain,
    IntensityX,
    IntensityXY,
    IntensityXYZ,
    IntensityScale,
    SustainX,
    SustainXY,
    SustainXYZ,
    SustainScale,
    XScale,
    XYScale,
    XYZScale,
    PitchValueIntensity,
    PitchValueSustain,
    PitchValueX,
    PitchValueXY,
    PitchValueXYZ,
    PitchValueScale,
    PitchIntensitySustain,
    PitchIntensityX,
    PitchIntensityXY,
    PitchIntensityXYZ,
    PitchIntensityScale,
    PitchSustainX,
    PitchSustainXY,
    PitchSustainXYZ,
    PitchSustainScale,
    PitchXScale,
    PitchXYScale,
    PitchXYZScale,
    ValueIntensitySustain,
    ValueIntensityX,
    ValueIntensityXY,
    ValueIntensityXYZ,
    ValueIntensityScale,
    ValueXScale,
    ValueXYScale,
    ValueXYZScale,
    IntensitySustainX,
    IntensitySustainXY,
    IntensitySustainXYZ,
    IntensitySustainScale,
    IntensityXScale,
    IntensityXYScale,
    IntensityXYZScale,
    SustainXScale,
    SustainXYScale,
    SustainXYZScale,
    PitchValueIntensitySustain,
    PitchValueIntensityX,
    PitchValueIntensityXY,
    PitchValueIntensityXYZ,
    PitchValueIntensityScale,
    PitchValueSustainX,
    PitchValueSustainXY,
    PitchValueSustainXYZ,
    PitchValueXScale,
    PitchValueXYScale,
    PitchValueXYZScale,
    PitchIntensitySustainX,
    PitchIntensitySustainXY,
    PitchIntensitySustainXYZ,
    PitchIntensitySustainScale,
    PitchIntensityXScale,
    PitchIntensityXYScale,
    PitchIntensityXYZScale,
    PitchSustainXScale,
    PitchSustainXYScale,
    PitchSustainXYZScale,
    ValueIntensitySustainX,
    ValueIntensitySustainXY,
    ValueIntensitySustainXYZ,
    ValueIntensitySustainScale,
    ValueIntensityXScale,
    ValueIntensityXYScale,
    ValueIntensityXYZScale,
    ValueSustainXScale,
    ValueSustainXYScale,
    ValueSustainXYZScale,
    IntensitySustainXScale,
    IntensitySustainXYScale,
    IntensitySustainXYZScale,
    PitchValueIntensitySustainX,
    PitchValueIntensitySustainXY,
    PitchValueIntensitySustainXYZ,
    PitchValueIntensitySustainScale,
    PitchValueIntensityXScale,
    PitchValueIntensityXYScale,
    PitchValueIntensityXYZScale,
    PitchValueSustainXScale,
    PitchValueSustainXYScale,
    PitchValueSustainXYZScale,
    PitchIntensitySustainXScale,
    PitchIntensitySustainXYScale,
    PitchIntensitySustainXYZScale,
    ValueIntensitySustainXScale,
    ValueIntensitySustainXYScale,
    ValueIntensitySustainXYZScale,
    PitchValueIntensitySustainXScale,
    PitchValueIntensitySustainXYScale,
    PitchValueIntensitySustainXYZScale,
}
