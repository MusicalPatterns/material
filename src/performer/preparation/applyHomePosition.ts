import { apply, Coordinate, Index, map, Meters, ofUnits, to } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Meters>) => Sound =
    (sound: Sound, homePosition: Coordinate<Meters>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Meters, index: Index<Meters>) =>
            apply.Translation(
                meters,
                to.Translation(ofUnits<'Meters'>(apply.Index(homePosition, index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
