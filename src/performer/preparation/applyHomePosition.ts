import { as, Coordinate, map, Meters, ofNotAs, Ordinal, use } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Meters>) => Sound =
    (sound: Sound, homePosition: Coordinate<Meters>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Meters, index: Ordinal<Meters>) =>
            use.Translation(
                meters,
                as.Translation(ofNotAs(use.Ordinal(homePosition, index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
