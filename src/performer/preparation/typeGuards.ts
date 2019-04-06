import { SourceType } from '../performance'
import { OscillatorSourceRequest, SampleSourceRequest, SourceRequest } from './types'

const sourceRequestIsSampleSourceRequest: (sourceRequest: SourceRequest) => sourceRequest is SampleSourceRequest =
    (sourceRequest: SourceRequest): sourceRequest is SampleSourceRequest =>
        sourceRequest.sourceType === SourceType.SAMPLE

const sourceRequestIsOscillatorSourceRequest:
    (sourceRequest: SourceRequest) => sourceRequest is OscillatorSourceRequest =
    (sourceRequest: SourceRequest): sourceRequest is OscillatorSourceRequest =>
        sourceRequest.sourceType === SourceType.OSCILLATOR

export {
    sourceRequestIsSampleSourceRequest,
    sourceRequestIsOscillatorSourceRequest,
}
