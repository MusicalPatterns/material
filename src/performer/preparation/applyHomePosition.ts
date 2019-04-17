import { apply, Coordinate, map, Meters, ofFrom, Ordinal, to } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Meters>) => Sound =
    (sound: Sound, homePosition: Coordinate<Meters>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Meters, index: Ordinal<Meters>) =>
            apply.Translation(
                meters,
                to.Translation(ofFrom(apply.Ordinal(homePosition, index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
