import { as, Coordinate, map, ofNotAs, Ordinal, Position, use } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomePosition: (sound: Sound, homePosition: Coordinate<Position>) => Sound =
    (sound: Sound, homePosition: Coordinate<Position>): Sound => ({
        ...sound,
        position: map(sound.position, (meters: Position, index: Ordinal<Coordinate<Position>>) =>
            use.Cardinal(
                meters,
                as.Cardinal(ofNotAs(use.Ordinal(homePosition, index))),
            ),
        ),
    })

export {
    applyHomePosition,
}
