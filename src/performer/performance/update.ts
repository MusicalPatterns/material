import {
    as,
    INCREMENT,
    indexJustBeyondFinalElement,
    isEmpty,
    Meters,
    Ms,
    Point,
    use,
} from '@musical-patterns/utilities'
import { PreparedVoice, Sound } from '../types'
import { NON_SEGNO_INDEX } from './constants'

const startPreparedVoiceSound: (preparedVoice: PreparedVoice, sound: Sound) => void =
    (preparedVoice: PreparedVoice, sound: Sound): void => {
        preparedVoice.source.startSound({
            ...sound,
            position: sound.position || [ 0, 0, 0 ].map((dimension: number) => as.Point<Meters>(dimension)),
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

const update: (preparedVoice: PreparedVoice, timePosition: Point<Ms>) => void =
    (preparedVoice: PreparedVoice, timePosition: Point<Ms>): void => {
        const { delay, sounds, soundIndex, nextStart, nextStop, source } = preparedVoice

        if (timePosition > use.Translation(nextStop, delay)) {
            source.stopSound()
        }

        if (soundIndex === NON_SEGNO_INDEX) {
            return
        }

        if (isEmpty(sounds)) {
            return
        }
        const sound: Sound = use.Ordinal(sounds, soundIndex)

        if (timePosition > use.Translation(nextStart, delay)) {
            startPreparedVoiceSound(preparedVoice, sound)
        }
    }

export {
    update,
}
