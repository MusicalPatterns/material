// tslint:disable no-magic-numbers max-file-line-count

import { Block, ContourPiece, Duration, Pitch, Scalar } from '@musical-patterns/utilities'
import { Note } from '../compiler'

interface MaterializeStandardScalesOptions {
    durationScalars?: Array<Scalar<Duration>>,
    pitchScalars?: Array<Scalar<Pitch>>,
}

type Segment = Note[][]

type Rendering<ContourType> = (block: Block) => ContourPiece<ContourType>

type RenderingByBlockElement<ContourType> = (blockElement: number) => ContourPiece<ContourType>

type PitchOnly = 1 & { _PitchOnlyBrand: void }
type DurationOnly = 1 & { _DurationOnlyBrand: void }
type GainOnly = 1 & { _GainOnlyBrand: void }
type SustainOnly = 1 & { _SustainOnlyBrand: void }
type XOnly = 1 & { _XOnlyBrand: void }
type XYOnly = 2 & { _XYOnlyBrand: void }
type XYZOnly = 3 & { _XYZOnlyBrand: void }
type ScaleOnly = 1 & { _ScaleOnlyBrand: void }
type PitchDuration = 2 & { _PitchDurationBrand: void }
type PitchGain = 2 & { _PitchGainBrand: void }
type PitchSustain = 2 & { _PitchSustainBrand: void }
type PitchX = 2 & { _PitchXBrand: void }
type PitchXY = 3 & { _PitchXYBrand: void }
type PitchXYZ = 4 & { _PitchXYZBrand: void }
type PitchScale = 2 & { _PitchScaleBrand: void }
type DurationGain = 2 & { _DurationGainBrand: void }
type DurationSustain = 2 & { _DurationSustainBrand: void }
type DurationX = 2 & { _DurationXBrand: void }
type DurationXY = 3 & { _DurationXYBrand: void }
type DurationXYZ = 4 & { _DurationXYZBrand: void }
type DurationScale = 2 & { _DurationScaleBrand: void }
type GainSustain = 2 & { _GainSustainBrand: void }
type GainX = 2 & { _GainXBrand: void }
type GainXY = 3 & { _GainXYBrand: void }
type GainXYZ = 4 & { _GainXYZBrand: void }
type GainScale = 2 & { _GainScaleBrand: void }
type SustainX = 2 & { _SustainXBrand: void }
type SustainXY = 3 & { _SustainXYBrand: void }
type SustainXYZ = 4 & { _SustainXYZBrand: void }
type SustainScale = 2 & { _SustainScaleBrand: void }
type XScale = 2 & { _XScaleBrand: void }
type XYScale = 3 & { _XYScaleBrand: void }
type XYZScale = 4 & { _XYZScaleBrand: void }
type PitchDurationGain = 3 & { _PitchDurationGainBrand: void }
type PitchDurationSustain = 3 & { _PitchDurationSustainBrand: void }
type PitchDurationX = 3 & { _PitchDurationXBrand: void }
type PitchDurationXY = 4 & { _PitchDurationXYBrand: void }
type PitchDurationXYZ = 5 & { _PitchDurationXYZBrand: void }
type PitchDurationScale = 3 & { _PitchDurationScaleBrand: void }
type PitchGainSustain = 3 & { _PitchGainSustainBrand: void }
type PitchGainX = 3 & { _PitchGainXBrand: void }
type PitchGainXY = 4 & { _PitchGainXYBrand: void }
type PitchGainXYZ = 5 & { _PitchGainXYZBrand: void }
type PitchGainScale = 3 & { _PitchGainScaleBrand: void }
type PitchSustainX = 3 & { _PitchSustainXBrand: void }
type PitchSustainXY = 4 & { _PitchSustainXYBrand: void }
type PitchSustainXYZ = 5 & { _PitchSustainXYZBrand: void }
type PitchSustainScale = 3 & { _PitchSustainScaleBrand: void }
type PitchXScale = 3 & { _PitchXScaleBrand: void }
type PitchXYScale = 4 & { _PitchXYScaleBrand: void }
type PitchXYZScale = 5 & { _PitchXYZScaleBrand: void }
type DurationGainSustain = 3 & { _DurationGainSustainBrand: void }
type DurationGainX = 3 & { _DurationGainXBrand: void }
type DurationGainXY = 4 & { _DurationGainXYBrand: void }
type DurationGainXYZ = 5 & { _DurationGainXYZBrand: void }
type DurationGainScale = 3 & { _DurationGainScaleBrand: void }
type DurationXScale = 3 & { _DurationXScaleBrand: void }
type DurationXYScale = 4 & { _DurationXYScaleBrand: void }
type DurationXYZScale = 5 & { _DurationXYZScaleBrand: void }
type GainSustainX = 3 & { _GainSustainXBrand: void }
type GainSustainXY = 4 & { _GainSustainXYBrand: void }
type GainSustainXYZ = 5 & { _GainSustainXYZBrand: void }
type GainSustainScale = 3 & { _GainSustainScaleBrand: void }
type GainXScale = 3 & { _GainXScaleBrand: void }
type GainXYScale = 4 & { _GainXYScaleBrand: void }
type GainXYZScale = 5 & { _GainXYZScaleBrand: void }
type SustainXScale = 3 & { _SustainXScaleBrand: void }
type SustainXYScale = 4 & { _SustainXYScaleBrand: void }
type SustainXYZScale = 5 & { _SustainXYZScaleBrand: void }
type PitchDurationGainSustain = 4 & { _PitchDurationGainSustainBrand: void }
type PitchDurationGainX = 4 & { _PitchDurationGainXBrand: void }
type PitchDurationGainXY = 5 & { _PitchDurationGainXYBrand: void }
type PitchDurationGainXYZ = 6 & { _PitchDurationGainXYZBrand: void }
type PitchDurationGainScale = 4 & { _PitchDurationGainScaleBrand: void }
type PitchDurationSustainX = 4 & { _PitchDurationSustainXBrand: void }
type PitchDurationSustainXY = 5 & { _PitchDurationSustainXYBrand: void }
type PitchDurationSustainXYZ = 6 & { _PitchDurationSustainXYZBrand: void }
type PitchDurationXScale = 4 & { _PitchDurationXScale: void }
type PitchDurationXYScale = 5 & { _PitchDurationXYScale: void }
type PitchDurationXYZScale = 6 & { _PitchDurationXYZScale: void }
type PitchGainSustainX = 4 & { _PitchGainSustainXBrand: void }
type PitchGainSustainXY = 5 & { _PitchGainSustainXYBrand: void }
type PitchGainSustainXYZ = 6 & { _PitchGainSustainXYZBrand: void }
type PitchGainSustainScale = 4 & { _PitchGainSustainScaleBrand: void }
type PitchGainXScale = 4 & { _PitchGainXScaleBrand: void }
type PitchGainXYScale = 5 & { _PitchGainXYScaleBrand: void }
type PitchGainXYZScale = 6 & { _PitchGainXYZScaleBrand: void }
type PitchSustainXScale = 4 & { _PitchSustainXScaleBrand: void }
type PitchSustainXYScale = 5 & { _PitchSustainXYScaleBrand: void }
type PitchSustainXYZScale = 6 & { _PitchSustainXYZScaleBrand: void }
type DurationGainSustainX = 4 & { _DurationGainSustainXBrand: void }
type DurationGainSustainXY = 5 & { _DurationGainSustainXYBrand: void }
type DurationGainSustainXYZ = 6 & { _DurationGainSustainXYZBrand: void }
type DurationGainSustainScale = 4 & { _DurationGainSustainScaleBrand: void }
type DurationGainXScale = 4 & { _DurationGainXScaleBrand: void }
type DurationGainXYScale = 5 & { _DurationGainXYScaleBrand: void }
type DurationGainXYZScale = 6 & { _DurationGainXYZScaleBrand: void }
type DurationSustainXScale = 4 & { _DurationGainXScaleBrand: void }
type DurationSustainXYScale = 5 & { _DurationGainXYScaleBrand: void }
type DurationSustainXYZScale = 6 & { _DurationGainXYZScaleBrand: void }
type GainSustainXScale = 4 & { _DurationGainXScaleBrand: void }
type GainSustainXYScale = 5 & { _DurationGainXYScaleBrand: void }
type GainSustainXYZScale = 6 & { _DurationGainXYZScaleBrand: void }
type PitchDurationGainSustainX = 5 & { _PitchDurationGainSustainXBrand: void }
type PitchDurationGainSustainXY = 6 & { _PitchDurationGainSustainXYBrand: void }
type PitchDurationGainSustainXYZ = 7 & { _PitchDurationGainSustainXYZBrand: void }
type PitchDurationGainSustainScale = 5 & { _PitchDurationGainSustainScaleBrand: void }
type PitchDurationGainXScale = 5 & { _PitchDurationGainXScaleBrand: void }
type PitchDurationGainXYScale = 6 & { _PitchDurationGainXYScaleBrand: void }
type PitchDurationGainXYZScale = 7 & { _PitchDurationGainXYZScaleBrand: void }
type PitchDurationSustainXScale = 5 & { _PitchDurationSustainXScaleBrand: void }
type PitchDurationSustainXYScale = 6 & { _PitchDurationSustainXYScaleBrand: void }
type PitchDurationSustainXYZScale = 7 & { _PitchDurationSustainXYZScaleBrand: void }
type PitchGainSustainXScale = 5 & { _PitchGainSustainXScaleBrand: void }
type PitchGainSustainXYScale = 6 & { _PitchGainSustainXYScaleBrand: void }
type PitchGainSustainXYZScale = 7 & { _PitchGainSustainXYZScaleBrand: void }
type DurationGainSustainXScale = 5 & { _DurationGainSustainXScaleBrand: void }
type DurationGainSustainXYScale = 6 & { _DurationGainSustainXYScaleBrand: void }
type DurationGainSustainXYZScale = 7 & { _DurationGainSustainXYZScaleBrand: void }
type PitchDurationGainSustainXScale = 6 & { _PitchDurationGainSustainXScaleBrand: void }
type PitchDurationGainSustainXYScale = 7 & { _PitchDurationGainSustainXYScaleBrand: void }
type PitchDurationGainSustainXYZScale = 8 & { _PitchDurationGainSustainXYZScaleBrand: void }

export {
    MaterializeStandardScalesOptions,
    Segment,
    Rendering,
    RenderingByBlockElement,
    PitchOnly,
    DurationOnly,
    GainOnly,
    SustainOnly,
    XOnly,
    XYOnly,
    XYZOnly,
    ScaleOnly,
    PitchDuration,
    PitchGain,
    PitchSustain,
    PitchX,
    PitchXY,
    PitchXYZ,
    PitchScale,
    DurationGain,
    DurationSustain,
    DurationX,
    DurationXY,
    DurationXYZ,
    DurationScale,
    GainSustain,
    GainX,
    GainXY,
    GainXYZ,
    GainScale,
    SustainX,
    SustainXY,
    SustainXYZ,
    SustainScale,
    XScale,
    XYScale,
    XYZScale,
    PitchDurationGain,
    PitchDurationSustain,
    PitchDurationX,
    PitchDurationXY,
    PitchDurationXYZ,
    PitchDurationScale,
    PitchGainSustain,
    PitchGainX,
    PitchGainXY,
    PitchGainXYZ,
    PitchGainScale,
    PitchSustainX,
    PitchSustainXY,
    PitchSustainXYZ,
    PitchSustainScale,
    PitchXScale,
    PitchXYScale,
    PitchXYZScale,
    DurationGainSustain,
    DurationGainX,
    DurationGainXY,
    DurationGainXYZ,
    DurationGainScale,
    DurationXScale,
    DurationXYScale,
    DurationXYZScale,
    GainSustainX,
    GainSustainXY,
    GainSustainXYZ,
    GainSustainScale,
    GainXScale,
    GainXYScale,
    GainXYZScale,
    SustainXScale,
    SustainXYScale,
    SustainXYZScale,
    PitchDurationGainSustain,
    PitchDurationGainX,
    PitchDurationGainXY,
    PitchDurationGainXYZ,
    PitchDurationGainScale,
    PitchDurationSustainX,
    PitchDurationSustainXY,
    PitchDurationSustainXYZ,
    PitchDurationXScale,
    PitchDurationXYScale,
    PitchDurationXYZScale,
    PitchGainSustainX,
    PitchGainSustainXY,
    PitchGainSustainXYZ,
    PitchGainSustainScale,
    PitchGainXScale,
    PitchGainXYScale,
    PitchGainXYZScale,
    PitchSustainXScale,
    PitchSustainXYScale,
    PitchSustainXYZScale,
    DurationGainSustainX,
    DurationGainSustainXY,
    DurationGainSustainXYZ,
    DurationGainSustainScale,
    DurationGainXScale,
    DurationGainXYScale,
    DurationGainXYZScale,
    DurationSustainXScale,
    DurationSustainXYScale,
    DurationSustainXYZScale,
    GainSustainXScale,
    GainSustainXYScale,
    GainSustainXYZScale,
    PitchDurationGainSustainX,
    PitchDurationGainSustainXY,
    PitchDurationGainSustainXYZ,
    PitchDurationGainSustainScale,
    PitchDurationGainXScale,
    PitchDurationGainXYScale,
    PitchDurationGainXYZScale,
    PitchDurationSustainXScale,
    PitchDurationSustainXYScale,
    PitchDurationSustainXYZScale,
    PitchGainSustainXScale,
    PitchGainSustainXYScale,
    PitchGainSustainXYZScale,
    DurationGainSustainXScale,
    DurationGainSustainXYScale,
    DurationGainSustainXYZScale,
    PitchDurationGainSustainXScale,
    PitchDurationGainSustainXYScale,
    PitchDurationGainSustainXYZScale,
}
