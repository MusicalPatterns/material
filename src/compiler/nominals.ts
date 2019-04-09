// tslint:disable no-any

import {
    computeNominalInterface,
    Coordinate,
    DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE,
    Hz,
    Meters,
    Ms,
    Scalar,
} from '@musical-patterns/utilities'

type SoundFeature =
    (
        // tslint:disable-next-line max-union-size
        Ms |
        Scalar |
        Hz |
        Coordinate<Meters> |
        Meters
        ) & Number

const { to, from } = computeNominalInterface({
    number: {
        SoundFeature: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as SoundFeature,
    },
})

export {
    to,
    from,
    SoundFeature,
}
