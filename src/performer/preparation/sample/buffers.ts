import { keyExistsOnObject, objectSet } from '@musical-patterns/utilities'
import { context } from '../../performance'
import { SampleName, Samples } from './types'

// tslint:disable no-object-literal-type-assertion
const samples: Samples = {} as Samples

const getBuffer: (sampleName: SampleName) => Promise<AudioBuffer> =
    async (sampleName: SampleName): Promise<AudioBuffer> => {
        if (!keyExistsOnObject(sampleName, samples)) {
            await load(sampleName)
        }

        return samples[ sampleName ]
    }

const load: (sampleName: SampleName) => Promise<void> =
    async (sampleName: SampleName): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            const request: XMLHttpRequest = new XMLHttpRequest()
            const url: string = `assets/samples/${sampleName}.mp3`
            request.open('GET', url, true)
            request.responseType = 'arraybuffer'

            request.onload = async (): Promise<void> => {
                const audioData: ArrayBuffer = request.response
                await context.decodeAudioData(audioData, (sample: AudioBuffer): void => {
                    objectSet(samples, sampleName, sample)
                    resolve()
                })
            }
            request.send()
        })

export {
    getBuffer,
}
