import { apply, Coordinate, Index, map, Meters, to } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Meters>) => Sound =
    (sound: Sound, homePosition: Coordinate<Meters>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Meters, index: Index) =>
            apply.Translation(
                meters,
                to.Translation(apply.Index(homePosition, to.Meters(index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
