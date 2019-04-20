import { as, INCREMENT, indexJustBeyondFinalElement, isEmpty, Ms, ofNotAs, use } from '@musical-patterns/utilities'
import { PreparedVoice, Sound } from '../types'
import { NON_SEGNO_INDEX } from './constants'

const startPreparedVoiceSound: (preparedVoice: PreparedVoice, sound: Sound) => void =
    (preparedVoice: PreparedVoice, sound: Sound): void => {
        preparedVoice.source.startSound({
            ...sound,
            position: sound.position || [ 0, 0, 0 ].map(as.Meters),
        })

        preparedVoice.nextStop = use.Translation(
            preparedVoice.nextStart,
            as.Translation(ofNotAs(sound.sustain)),
        )
        preparedVoice.nextStart = use.Translation(
            preparedVoice.nextStart,
            as.Translation(ofNotAs(sound.duration)),
        )

        preparedVoice.soundIndex = use.Translation(preparedVoice.soundIndex, INCREMENT)

        if (preparedVoice.soundIndex === indexJustBeyondFinalElement(preparedVoice.sounds)) {
            preparedVoice.soundIndex = preparedVoice.segnoIndex
        }
    }

const update: (preparedVoice: PreparedVoice, timePosition: Ms) => void =
    (preparedVoice: PreparedVoice, timePosition: Ms): void => {
        const { delay, sounds, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (timePosition > use.Translation(nextStop, as.Translation(ofNotAs(delay)))) {
            source.stopSound()
        }

        if (soundIndex === NON_SEGNO_INDEX) {
            return
        }

        if (isEmpty(sounds)) {
            return
        }
        const sound: Sound = use.Ordinal(sounds, soundIndex)

        if (timePosition > use.Translation(nextStart, as.Translation(ofNotAs(delay)))) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
