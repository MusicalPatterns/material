[![Build Status](https://travis-ci.com/MusicalPatterns/material.svg?branch=master)](https://travis-ci.com/MusicalPatterns/material)

# Musical Patterns - Material

Takes whatever amazing craziness a given pattern calls for and materializes it.

Consists of several components: 
- compiler
- performer
- snapshots
- patterns utilities

## Musical Patterns - Compiler

First it calls each of the "materialize" functions with the specs you've provided (or defaults to the pattern's initial specs).
For example, you could materialize some scales and entities using specs provided through making selections in the UI of the `@musical-patterns/playroom`.
The pattern's specs and materials are unique to each pattern, but their job is to together produce data the compiler can resolve.
So, once thus materialized, the compiler reduces the large amount of data produced down to fundamental sound instructions for the performer.

### usage

```
import { CompiledPattern, setupPerformer, Voice, compilePattern } from '@musical-patterns/material'

const material: Material = {
	materializeEntities,
}

const spec: MySpec extends StandardSpec = {
	// anything
}

const compiledPattern: CompiledPattern = await compilePattern({ material, spec })

setupPerformer({ compiledPattern })

```

### terminology

#### repetend

When a voice has a section which does not specify the number of times it should repeat, it will repeat forever. 
In this case, it is the voice's repetend. A repetend is a section. Its index is the index within an array of sections.

#### segno

Italian for 'sign', this is the time position a voice repeats from once it reaches its end.
The segno index is the index of a sound in the voice's sounds array.
The segno time is a position in milliseconds.

## Performer

Given a compiled pattern, hooks it up to the Web Audio and WebXR APIs and gives you the power to play it (and pause it, etc.)

### usage

#### setup

```
import { setupPerformer, OnUpdate } from '@musical-patterns/material'

const onUpdate: OnUpdate = time => {
	// do whatever you wanna do with the latest time here, such as update some display
	// note that the time this callback gets called with, if your pattern repeats from some point whenever it reaches the end, will restart to that time (it is not the raw time passed since starting the pattern in your reality; it is the time within the pattern)
}

await setupPerformer({ onUpdate })
```

This will ensure your browser is ready to start playing!

#### loading a pattern

```
import { setPattern, CompiledPattern } from '@musical-patterns/material'

const compiledPattern: CompiledPattern = {
	// your compiled pattern here
}

await setPattern(compiledPattern)
```

`setPattern` only sets what is to be performed. It does not start playing it yet.

#### starting and stopping

```
import { play, pause, stop } from '@musical-patterns/material'

# set paused to true
pause()
# set paused to false
play()
# or set paused to false plus reset the time to 0
await stop()

```

#### enabling immersive audio

```
import { enableImmersiveAudio } from '@musical-patterns/material'
import { buildVrb } from 'vrb'

const homePosition: Coordinate = [ 5, 4, 3 ]
const onReady: VoidFunction = () => {
	// do whatever you want once the VR device is ready
}
const onNoVr: VoidFunction = () => {
	// do whatever you want once it is determined that your system does not support VR
}

const toggleImmersiveAudioHandler: VoidFunction = enableImmersiveAudio({ vrb, homePosition, onReady, onNoVr })

const toggleImmersiveAudioButton = document.createElement('div')
toggleImmersiveAudioButton.innerText = 'Toggle Immersive Audio'
toggleImmersiveAudioButton.addEventListener('click', toggleImmersiveAudioHandler)
document.body.appendChild(toggleImmersiveAudioButton)
```

If you have your own instance of Vrb ([https://www.npmjs.com/package/vrb](https://www.npmjs.com/package/vrb)) you may inject it here.
If you do not, Vrb is what will be used under the hood for WebVR and it will be automatically configured to reasonable defaults for you.

#### or if you're an eager beaver

If you pass `voices` to the setup, it will automatically start playing them.

```
import { compilePattern, setupPerformer, CompiledPattern } from '@musical-patterns/material'
import { pattern } from '@musical-patterns/pattern-houndstoothtopia-theme'

const compiledPattern: CompiledPattern = await compilePattern(pattern)
await setupPerformer({
	compiledPattern,
})

```

#### jumping around in time

```
import { setTime } from '@musical-patterns/material'

await setTime(14000)

```

It will keep playing if it was playing already.

## Snapshot

Similar to the `@musical-patterns/cli` repo, upon installation, copies snapshot files into the pattern repo.

These files are:

- Makefile.snapshots
- test/snapshots.test.ts

When inside the directory of a pattern for which you want to update the snapshot, run:

```
musical-patterns-snapshots
```

Or `make snapshots` since the `Makefile.snapshots` aliases it like that.

Uses the compiler to maintain an up-to-date copy of compiled pattern data in the repo.
This `snapshots.json` file is tested against before each shipment, ensuring your pattern doesn't change if you don't mean it to.
It tests your initial specs as well as the specs for each preset.
