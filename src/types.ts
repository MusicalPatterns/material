// tslint:disable no-any

import { Ms, Scalar, Translation } from '@musical-patterns/utilities'
import { Section, TimbreName } from './compiler'

interface Material {
    materializeEntities: MaterializeEntities,
    materializeScales?: MaterializeScales,
}

type MaterializeEntities = (specs?: any) => Entity[]
type MaterializeScales = (specs?: any) => Scale[]

interface Entity {
    delay?: Translation<Ms>,
    sections?: Section[],
    timbreName?: TimbreName,
}

interface Scale<NumericType extends Number = number> extends Adjustable<NumericType> {
    scalars?: Array<Scalar<NumericType>>,
}

interface Adjustable<NumericType extends Number = number> {
    scalar?: Scalar<NumericType>,
    translation?: Translation<NumericType>,
}

export {
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    Scale,
    Adjustable,
}
