import { Ms, Ordinal, Point } from '@musical-patterns/utilities'
import { SourceType } from '../performance'
import { Sound } from '../types'
import { OscillatorName } from './oscillator'
import { SampleName } from './sample'

type SourceRequest = SampleSourceRequest | OscillatorSourceRequest

interface SampleSourceRequest {
    sourceType: SourceType.SAMPLE,
    timbreName: SampleName,
}

interface OscillatorSourceRequest {
    sourceType: SourceType.OSCILLATOR,
    timbreName: OscillatorName,
}

interface NextSound {
    nextStart: Point<Ms>,
    soundIndex: Ordinal<Sound[]>,
}

interface ComputeNextSoundAfterTimeParameters {
    segnoIndex: Ordinal<Sound[]>,
    sounds: Sound[],
    time: Point<Ms>,
}

export {
    SourceRequest,
    NextSound,
    SampleSourceRequest,
    OscillatorSourceRequest,
    ComputeNextSoundAfterTimeParameters,
}
