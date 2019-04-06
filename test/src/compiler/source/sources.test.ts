import { Maybe } from '@musical-patterns/utilities'
import {
    compileSourceRequest,
    OscillatorName,
    SampleName,
    SourceRequest,
    SourceType,
    TimbreNameEnum,
} from '../../../../src/indexForTest'

describe('compile source', () => {
    it('works for samples', () => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.KICK)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.SAMPLE,
                timbreName: SampleName.KICK,
            })
    })

    it('works for oscillators', () => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.SINE)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.OSCILLATOR,
                timbreName: OscillatorName.SINE,
            })
    })
})
