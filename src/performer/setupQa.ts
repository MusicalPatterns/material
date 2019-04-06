import { snapshots } from '@musical-patterns/pattern-performer-qa'
import { BEGINNING, to } from '@musical-patterns/utilities'
import { PERFORMER_QA_PATTERN_TOTAL_DURATION } from './constants'
import {
    enableImmersiveAudio,
    pause,
    play,
    setTimePosition,
    setupPerformer,
    stop,
    ToggleImmersiveAudioHandlers,
} from './interface'

const setupQa: () => Promise<void> =
    async (): Promise<void> => {
        await setupPerformer({
            compiledPattern: {
                segnoTime: BEGINNING,
                totalDuration: PERFORMER_QA_PATTERN_TOTAL_DURATION,
                voices: snapshots.initial,
            },
        })
        const { enterImmersiveAudio, exitImmersiveAudio }: ToggleImmersiveAudioHandlers = enableImmersiveAudio()

        const setTimeButton: HTMLElement = document.createElement('button')
        setTimeButton.innerText = 'Set Ms (to 14800)'
        // tslint:disable-next-line no-magic-numbers
        setTimeButton.addEventListener('click', async () => setTimePosition(to.Ms(14800)))
        document.body.appendChild(setTimeButton)

        const stopButton: HTMLElement = document.createElement('button')
        stopButton.innerText = 'Stop'
        stopButton.addEventListener('click', stop)
        document.body.appendChild(stopButton)

        const playButton: HTMLElement = document.createElement('button')
        playButton.innerText = 'Play'
        playButton.addEventListener('click', play)
        document.body.appendChild(playButton)

        const pauseButton: HTMLElement = document.createElement('button')
        pauseButton.innerText = 'Pause'
        pauseButton.addEventListener('click', pause)
        document.body.appendChild(pauseButton)

        const enterImmersiveAudioButton: HTMLElement = document.createElement('button')
        enterImmersiveAudioButton.innerText = 'Enter Immersive Audio'
        enterImmersiveAudioButton.addEventListener('click', enterImmersiveAudio)
        document.body.appendChild(enterImmersiveAudioButton)

        const exitImmersiveAudioButton: HTMLElement = document.createElement('button')
        exitImmersiveAudioButton.innerText = 'Exit Immersive Audio'
        exitImmersiveAudioButton.addEventListener('click', exitImmersiveAudio)
        document.body.appendChild(exitImmersiveAudioButton)
    }

export {
    setupQa,
}
