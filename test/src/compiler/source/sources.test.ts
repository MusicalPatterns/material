import { Maybe } from '@musical-patterns/utilities'
import {
    compileSourceRequest,
    OscillatorName,
    SampleName,
    SourceRequest,
    SourceType,
    TimbreNameEnum,
} from '../../../../src/indexForTest'

describe('compile source', (): void => {
    it('works for samples', (): void => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.KICK)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.SAMPLE,
                timbreName: SampleName.KICK,
            })
    })

    it('works for oscillators', (): void => {
        const sourceRequest: Maybe<SourceRequest> = compileSourceRequest(TimbreNameEnum.SINE)

        expect(sourceRequest)
            .toEqual({
                sourceType: SourceType.OSCILLATOR,
                timbreName: OscillatorName.SINE,
            })
    })
})
