// tslint:disable no-any

import {
    Amplitude,
    computeNominalInterface,
    Coordinate,
    DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE,
    Hz,
    Meters,
    Ms,
    NormalScalar,
    Scalar,
} from '@musical-patterns/utilities'

type SoundFeature =
    (
        // tslint:disable-next-line max-union-size
        Ms |
        NormalScalar<Amplitude> |
        Scalar |
        Hz |
        Coordinate<Meters> |
        Meters
        ) & Number

const { as, notAs } = computeNominalInterface({
    number: {
        SoundFeature: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as SoundFeature,
    },
})

export {
    as,
    notAs,
    SoundFeature,
}
