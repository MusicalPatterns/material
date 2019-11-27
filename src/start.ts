// Import { Id } from '@musical-patterns/id'
// Import { patterns } from '@musical-patterns/pattern-material-qa'
// Import { as, isUndefined, Ms } from '@musical-patterns/utilities'
// Import {
//     EnableImmersiveAudio,
//     Pause,
//     Play,
//     SetPattern,
//     SetTime,
//     SetupPerformer,
//     Stop,
//     ToggleImmersiveAudioHandlers,
// } from './interface'
//
// Const setupQa: () => Promise<void> =
//     Async (): Promise<void> => {
//         Const { [ Id.MATERIAL_QA ]: materialQa, [ Id.MATERIAL_QA_DELAY ]: materialQaDelay } = patterns
//         Await setupPerformer({ pattern: materialQa })
//         Const { enterImmersiveAudio, exitImmersiveAudio }: ToggleImmersiveAudioHandlers = enableImmersiveAudio()
//
//         Const setTimeButton: HTMLElement = document.createElement('button')
//         SetTimeButton.innerText = 'Set Ms (to 14800)'
//         // tslint:disable-next-line no-magic-numbers
//         SetTimeButton.addEventListener('click', async () => setTime(as.Point<Ms>(14800)))
//         Document.body.appendChild(setTimeButton)
//
//         Const stopButton: HTMLElement = document.createElement('button')
//         StopButton.innerText = 'Stop'
//         StopButton.addEventListener('click', stop)
//         Document.body.appendChild(stopButton)
//
//         Const playButton: HTMLElement = document.createElement('button')
//         PlayButton.innerText = 'Play'
//         PlayButton.addEventListener('click', play)
//         Document.body.appendChild(playButton)
//
//         Const pauseButton: HTMLElement = document.createElement('button')
//         PauseButton.innerText = 'Pause'
//         PauseButton.addEventListener('click', pause)
//         Document.body.appendChild(pauseButton)
//
//         Const enterImmersiveAudioButton: HTMLElement = document.createElement('button')
//         EnterImmersiveAudioButton.innerText = 'Enter Immersive Audio'
//         EnterImmersiveAudioButton.addEventListener('click', enterImmersiveAudio)
//         Document.body.appendChild(enterImmersiveAudioButton)
//
//         Const exitImmersiveAudioButton: HTMLElement = document.createElement('button')
//         ExitImmersiveAudioButton.innerText = 'Exit Immersive Audio'
//         ExitImmersiveAudioButton.addEventListener('click', exitImmersiveAudio)
//         Document.body.appendChild(exitImmersiveAudioButton)
//
//         Const materialQaDelayButton: HTMLElement = document.createElement('button')
//         MaterialQaDelayButton.innerText = 'Switch to Delay Pattern'
//         MaterialQaDelayButton.addEventListener('click', async () => {
//             If (isUndefined(materialQaDelay)) {
//                 Return
//             }
//
//             Await setPattern(materialQaDelay)
//         })
//         Document.body.appendChild(materialQaDelayButton)
//     }
//
// SetupQa()
// //     .then()
// //     .catch()
