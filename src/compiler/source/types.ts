import { OscillatorName, SampleName } from '../../performer'

type TimbreName = SampleName | OscillatorName

// tslint:disable-next-line variable-name typedef
const TimbreNameEnum = {
    ...OscillatorName,
    ...SampleName,
}

export {
    TimbreName,
    TimbreNameEnum,
}
