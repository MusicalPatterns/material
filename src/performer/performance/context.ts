// tslint:disable no-type-definitions-outside-types-modules variable-name

import { logMessageToScreen } from '@musical-patterns/utilities'

type AudioContextConstructor = new() => AudioContext;

// @ts-ignore
const AudioContext: AudioContextConstructor = global.AudioContext || global.webkitAudioContext || false

let context: AudioContext
if (AudioContext) {
    context = new AudioContext()
}
else {
    logMessageToScreen(`
Sorry, but the Web Audio API is not supported by your browser.
Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox
    `)
}

export {
    context,
}
