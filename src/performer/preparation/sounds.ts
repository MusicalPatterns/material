import { Coordinate, Location, Maybe, ThreeDimensional } from '@musical-patterns/utilities'
import { Vrb } from 'vrb'
import { ImmutableState, StateKey, store } from '../state'
import { Sound } from '../types'
import { applyHomeLocation } from './applyHomeLocation'
import { applyGainNormalScalarForWebAudioOscillators } from './oscillator'
import { applyPlaybackRate } from './sample'
import { sourceRequestIsSampleSourceRequest } from './typeGuards'
import { SourceRequest } from './types'

const applySoundAdjustmentsForPerformer: (sounds: Sound[], options: SourceRequest) => Sound[] =
    (sounds: Sound[], sourceRequest: SourceRequest): Sound[] => {
        let outputSounds: Sound[] = sounds
        if (sourceRequestIsSampleSourceRequest(sourceRequest)) {
            outputSounds = outputSounds.map((sound: Sound): Sound =>
                applyPlaybackRate(sound, sourceRequest.timbreName))
        }
        else {
            outputSounds = outputSounds.map(applyGainNormalScalarForWebAudioOscillators)
        }

        const state: ImmutableState = store.getState()
        const webVr: Maybe<Vrb> = state.get(StateKey.WEB_VR)
        const homeLocation: Maybe<Coordinate<Location, ThreeDimensional>> = state.get(StateKey.HOME_LOCATION)
        if (webVr && homeLocation) {
            outputSounds = outputSounds.map((sound: Sound): Sound =>
                applyHomeLocation(sound, homeLocation))
        }

        return outputSounds
    }

export {
    applySoundAdjustmentsForPerformer,
}
