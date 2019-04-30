import {
    INCREMENT,
    indexJustBeyondFinalElement,
    isEmpty,
    Ms,
    musicalAs,
    Point,
    use,
} from '@musical-patterns/utilities'
import { PreparedVoice, Sound } from '../types'
import { NON_SEGNO_INDEX } from './constants'

const startPreparedVoiceSound: (preparedVoice: PreparedVoice, sound: Sound) => void =
    (preparedVoice: PreparedVoice, sound: Sound): void => {
        preparedVoice.source.startSound({
            ...sound,
            location: sound.location || [ 0, 0, 0 ].map((dimension: number) => musicalAs.Location(dimension)),
        })

        preparedVoice.nextStop = use.Translation(
            preparedVoice.nextStart,
            sound.sustain,
        )
        preparedVoice.nextStart = use.Translation(
            preparedVoice.nextStart,
            sound.duration,
        )

        preparedVoice.soundIndex = use.Cardinal(preparedVoice.soundIndex, INCREMENT)

        if (preparedVoice.soundIndex === indexJustBeyondFinalElement(preparedVoice.sounds)) {
            preparedVoice.soundIndex = preparedVoice.segnoIndex
        }
    }

const update: (preparedVoice: PreparedVoice, time: Point<Ms>) => void =
    (preparedVoice: PreparedVoice, time: Point<Ms>): void => {
        const { delay, sounds, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (time > use.Translation(nextStop, delay)) {
            source.stopSound()
        }

        if (soundIndex === NON_SEGNO_INDEX) {
            return
        }

        if (isEmpty(sounds)) {
            return
        }
        const sound: Sound = use.Ordinal(sounds, soundIndex)

        if (time > use.Translation(nextStart, delay)) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
