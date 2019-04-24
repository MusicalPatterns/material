// tslint:disable no-any

import { Duration, Scalar, Translation } from '@musical-patterns/utilities'
import { Section, TimbreName } from './compiler'

interface Material {
    materializeEntities: MaterializeEntities,
    materializeScales?: MaterializeScales,
}

type MaterializeEntities = (specs?: any) => Entity[]
type MaterializeScales = (specs?: any) => Scale[]

interface Entity {
    delay?: Duration,
    sections?: Section[],
    timbreName?: TimbreName,
}

interface Scale<NumericType extends Number = number> {
    basis?: NumericType,
    scalars?: Array<Scalar<NumericType>>,
    translation?: Translation<NumericType>,
}

export {
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    Scale,
}
