import { as, Coordinate, map, Meters, ofNotAs, Ordinal, Point, use } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Point<Meters>>) => Sound =
    (sound: Sound, homePosition: Coordinate<Point<Meters>>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Point<Meters>, index: Ordinal<Coordinate<Point<Meters>>>) =>
            use.Cardinal(
                meters,
                as.Cardinal(ofNotAs(use.Ordinal(homePosition, index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
