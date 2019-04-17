import { apply, INCREMENT, indexJustBeyondFinalElement, isEmpty, Ms, ofFrom, to } from '@musical-patterns/utilities'
import { PreparedVoice, Sound } from '../types'
import { NON_SEGNO_INDEX } from './constants'

const startPreparedVoiceSound: (preparedVoice: PreparedVoice, sound: Sound) => void =
    (preparedVoice: PreparedVoice, sound: Sound): void => {
        preparedVoice.source.startSound({
            ...sound,
            position: sound.position || [ 0, 0, 0 ].map(to.Meters),
        })

        preparedVoice.nextStop = apply.Translation(
            preparedVoice.nextStart,
            to.Translation(ofFrom(sound.sustain)),
        )
        preparedVoice.nextStart = apply.Translation(
            preparedVoice.nextStart,
            to.Translation(ofFrom(sound.duration)),
        )

        preparedVoice.soundIndex = apply.Translation(preparedVoice.soundIndex, INCREMENT)

        if (preparedVoice.soundIndex === indexJustBeyondFinalElement(preparedVoice.sounds)) {
            preparedVoice.soundIndex = preparedVoice.segnoIndex
        }
    }

const update: (preparedVoice: PreparedVoice, timePosition: Ms) => void =
    (preparedVoice: PreparedVoice, timePosition: Ms): void => {
        const { delay, sounds, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (timePosition > apply.Translation(nextStop, to.Translation(ofFrom(delay)))) {
            source.stopSound()
        }

        if (soundIndex === NON_SEGNO_INDEX) {
            return
        }

        if (isEmpty(sounds)) {
            return
        }
        const sound: Sound = apply.Ordinal(sounds, soundIndex)

        if (timePosition > apply.Translation(nextStart, to.Translation(ofFrom(delay)))) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
