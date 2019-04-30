import { BEGINNING, isUndefined, Ms, Point } from '@musical-patterns/utilities'
import { StateKey, store } from '../state'
import { PreparedVoice, Sound, Voice } from '../types'
import { computeNextSoundAfterTime } from './nextSoundAfterTime'
import { applySoundAdjustmentsForPerformer } from './sounds'
import { getSource } from './sources'

const prepareVoices: (voices: Voice[], time?: Point<Ms>) => Promise<PreparedVoice[]> =
    async (voices: Voice[], time?: Point<Ms>): Promise<PreparedVoice[]> => {
        let timeToStartAt: Point<Ms> = time || BEGINNING
        if (isUndefined(time)) {
            timeToStartAt = store.getState()
                .get(StateKey.TIME)
        }

        return Promise.all(voices.map(async (voice: Voice): Promise<PreparedVoice> => {
            const { delay, sounds, sourceRequest, segnoIndex } = voice
            const adjustedSounds: Sound[] = applySoundAdjustmentsForPerformer(sounds, sourceRequest)

            const { soundIndex, nextStart } = computeNextSoundAfterTime({
                segnoIndex,
                sounds: adjustedSounds,
                time: timeToStartAt,
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
