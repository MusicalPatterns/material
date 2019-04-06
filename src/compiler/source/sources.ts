import { isUndefined } from '@musical-patterns/utilities'
import { OscillatorName, SampleName, SourceRequest, SourceType } from '../../performer'
import { TimbreName } from './types'

const defaultSourceRequest: SourceRequest = {
    sourceType: SourceType.OSCILLATOR,
    timbreName: OscillatorName.SINE,
}

const isSampleName: (timbreName: TimbreName) => timbreName is SampleName =
    (timbreName: TimbreName): timbreName is SampleName =>
        timbreName in SampleName

const isOscillatorName: (timbreName: TimbreName) => timbreName is OscillatorName =
    (timbreName: TimbreName): timbreName is OscillatorName =>
        timbreName in OscillatorName

const compileSourceRequest: (timbreName?: TimbreName) => SourceRequest =
    (timbreName?: TimbreName): SourceRequest => {
        if (isUndefined(timbreName)) {
            return defaultSourceRequest
        }
        if (isSampleName(timbreName)) {
            return {
                sourceType: SourceType.SAMPLE,
                timbreName,
            }
        }
        if (isOscillatorName(timbreName)) {
            return {
                sourceType: SourceType.OSCILLATOR,
                timbreName,
            }
        }

        return defaultSourceRequest
    }

export {
    compileSourceRequest,
}
