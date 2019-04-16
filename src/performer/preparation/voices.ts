import { BEGINNING, isUndefined, Ms } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { PreparedVoice, Sound, Voice } from '../types'
import { computeNextSoundAfterTimePosition } from './nextSoundAfterTimePosition'
import { applySoundAdjustmentsForPerformer } from './sounds'
import { getSource } from './sources'

const prepareVoices: (voices: Voice[], timePosition?: Ms) => Promise<PreparedVoice[]> =
    async (voices: Voice[], timePosition?: Ms): Promise<PreparedVoice[]> => {
        let timePositionToStartAt: Ms = timePosition || BEGINNING
        if (isUndefined(timePosition)) {
            timePositionToStartAt = store.getState()
                .get(StateKey.TIME_POSITION)
        }

        return Promise.all(voices.map(async (voice: Voice): Promise<PreparedVoice> => {
            const { delay, sounds, sourceRequest, segnoIndex } = voice
            const adjustedSounds: Sound[] = applySoundAdjustmentsForPerformer(sounds, sourceRequest)

            const { soundIndex, nextStart } = computeNextSoundAfterTimePosition({
                segnoIndex,
                sounds: adjustedSounds,
                timePosition: timePositionToStartAt,
            })

            return {
                delay,
                nextStart,
                nextStop: nextStart,
                segnoIndex,
                soundIndex,
                sounds: adjustedSounds,
                source: await getSource(sourceRequest),
            }
        }))
    }

export {
    prepareVoices,
}
