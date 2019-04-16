import { Id } from '@musical-patterns/id'
// import { patterns } from '@musical-patterns/pattern-material-qa'
import { isUndefined, to } from '@musical-patterns/utilities'
import {
    enableImmersiveAudio,
    pause,
    play,
    setPattern,
    setTimePosition,
    setupPerformer,
    stop,
    ToggleImmersiveAudioHandlers,
} from './interface'

const setupQa: () => Promise<void> =
    async (): Promise<void> => {
        // const { [ Id.MATERIAL_QA ]: materialQa, [ Id.MATERIAL_QA_DELAY ]: materialQaDelay } = patterns
        // await setupPerformer({ pattern: materialQa })
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

        const materialQaDelayButton: HTMLElement = document.createElement('button')
        materialQaDelayButton.innerText = 'Switch to Delay Pattern'
        // materialQaDelayButton.addEventListener('click', async () => {
        //     if (isUndefined(materialQaDelay)) {
        //         return
        //     }
        //
        //     await setPattern(materialQaDelay)
        // })
        document.body.appendChild(materialQaDelayButton)
    }

setupQa()
    .then()
    .catch()
