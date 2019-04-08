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
    delay?: Ms,
    sections?: Section[],
    timbreName?: TimbreName,
}

interface Scale extends Adjustable {
    scalars?: Scalar[],
}

interface Adjustable {
    scalar?: Scalar,
    translation?: Translation,
}

export {
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    Scale,
    Adjustable,
}
