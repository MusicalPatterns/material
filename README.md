# Musical Patterns - Material

Takes whatever amazing craziness a given pattern calls for and materializes it.

Consists of several components: 
- compiler
- performer
- snapshots
- patterns utilities

## Musical Patterns - Compiler

First it calls each of the "materialize" functions with the specs you've provided (or defaults to the pattern's initial specs).
For example, you could materialize some Scales and Entities using specs provided through making selections in the UI of the `@musical-patterns/playroom`.
The pattern's specs and materials are unique to each pattern, but their job is to together produce data the compiler can resolve.
So, once thus materialized, the compiler reduces the large amount of data produced down to fundamental sound instructions for the performer.

### usage

```
import { CompiledPattern, Material, setupPerformer, compilePattern } from '@musical-patterns/material'
import { StandardSpec } from '@musical-patterns/spec'

const material: Material = {
	materializeEntities,
}

const spec: MySpec extends StandardSpec = {
	// anything
}

const compiledPattern: CompiledPattern = await compilePattern({ material, spec })

setupPerformer({ compiledPattern })

```

### terminology - high level

#### Scale

One of two things which are directly materialized, the other being Entities.
Scales are the bedrock of your composition, in that they map values which are in virtual units such as Time and Frequency into physical units such as Ms and Hz.
They also describe systems of numbers which are not experienced as music directly, but which are dereferenced by Entities as they make the music.

#### Entity

Entities are similar to tracks or performers. They are the more direct source of the resultant heard music.
They are associated with a timbre.
They also each have an array of Sections each of which has an array of Notes to play.
Finally, they can have a delay (otherwise all Entities start getting busy on their Notes right away upon pressing play).

#### Voice

During compilation, Entities are compiled into Voices. Their Notes are compiled into Sounds.
The idea is that Entities and Notes describe musical information in a way more readily understood by humans, while a Voice and its Sounds are the final, simplest form for the computer to play.

#### Section

Each Section has an array of Notes.
It also has a property called `repetitions`, which is how many times it will play those notes before moving on to the next Section.

#### repetend

If a Section's `repetitions` property not specified, the assumption is that the Section should be repeated indefinitely (even if there are further Sections in the array).
In this case, the Section is the Entity's "repetend".

#### segno

Italian for 'sign', this is the time position an Entity repeats from once it reaches its end.
The `segnoIndex` is the index of a Sound in the Voice's array of Sounds.
The `segnoTime`, on the other hand, is a time position in milliseconds.

This is a good example of the difference between human-styled Entities and computer-styled Voices:
Entities still have their Notes organized into separate arrays, one per Section.
A Voice, on the other hand, has collapsed all of its Sounds into a single array, having calculated and reduced down all the information from the Section organization into a single value, the `segnoIndex`.
So it has lost some of the information about where humans might feel a section to be restarting, but if it doesn't matter for performance, it is not represented here.

### terminology - low level

#### Block

Blocks are just arrays of numbers, a very abstract form of the pattern.

#### Rendering

A Rendering converts a Block to a ContourPiece. 
What Block and ContourPiece share in common is that each element will eventually become a Note.
The key differences between a Block and a ContourPiece are:

- A Block is an array of numbers, while a ContourPiece is an array of arrays of numbers.
- Each element in a ContourPiece corresponds with a feature of a Note (such as duration, pitch, or gain).

#### ContourPiece

What you get after you map a Rendering onto a Block.

ContourPiece is the smallest compositional object of the pattern, too small to write the pattern in directly.
Something like a bar in traditional Western music, I suppose. Really depends on the pattern though.
You'll need to sequence several of them together into a ContourWhole to get something substantial next.

A ContourPiece type is parameterized with a type which describes which Feature each value describes.
For instance, a PitchDurationGain parameter says that in a ContourElement (an element of a ContourPiece (or ContourWhole)),
the first value is used for pitch, the second for duration, and the third for gain.

It does not specify how the value will be used be for that Feature, though.
That is, the value in the slot for pitch may be used as a scalar directly, or it may be used as the index of a scalar in a Scale's array.
See Feature below for more information on that.

If you find yourself writing a pattern for which more than one piece of information for a given feature needs to be described, you may need to get creative and design your own paramater for ContourElement.
If you just need to provide both index and `scaleIndex`, you can solve your problem by using a parameter with "Scale" as one of the slots.
That one is generic to Feature and is intended to be used for whatever Feature cares about `scaleIndex`.
If you have more than one Feature which cares about `scaleIndex`, then yeah, get creative, good luck to you.

#### ContourWhole

A concatenation of several ContourPiece together; a large enough compositional object to write the pattern in directly;
a ContourWhole is still intended to be compiled to something for just one Entity to play.

#### Segment

Take a set of ContourWhole, and each ContourWhole has all of its ContourElements mapped to a Note, and each ContourWhole's Note total the same duration, so they can be played simultaneously by different Entities, but still sequenced together with other Segments
   
#### Note

A Note is the final step in the materialization process - the final step before handing over to the compiler.

#### Feature

Each Feature of a Note is described using a subset of four properties:
- *scalar*: This is the simplest method. The compiled value of this Feature will be the basis scaled by this amount. In this case, a Scale is not even used to determine the Feature.
- *index*: Each Note is associated with a Scale, which has an array of Scalars. The compiler will pull the Scalar with this index from that array, and the compiled value of this Feature will be the basis scaled by that amount. If you use this property and `scalar`, then both Scalars will be applied.
- *scaleIndex*: The compiler will override the default Scale for the Note. This property only matters if you are also using the `index` property.
- *translation*: After any/all Scalars are applied, a Translation may be applied as well.

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
