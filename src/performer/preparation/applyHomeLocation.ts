import { as, Coordinate, Location, map, ofNotAs, Ordinal, use } from '@musical-patterns/utilities'
import { Sound } from '../types'

const applyHomeLocation: (sound: Sound, homeLocation: Coordinate<Location>) => Sound =
    (sound: Sound, homeLocation: Coordinate<Location>): Sound => ({
        ...sound,
        location: map(sound.location, (meters: Location, index: Ordinal<Coordinate<Location>>): Location =>
            use.Cardinal(
                meters,
                as.Cardinal(ofNotAs(use.Ordinal(homeLocation, index))),
            ),
        ),
    })

export {
    applyHomeLocation,
}
