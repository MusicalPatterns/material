// tslint:disable no-any

import {
    Duration,
    Gain,
    Intensity,
    Location,
    Pitch,
    Position,
    Scalar,
    Tone,
    Translation,
    Value,
} from '@musical-patterns/utilities'
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
    basis?: AbstractToPhysical<NumericType>,
    scalars?: Array<Scalar<NumericType>>,
    translation?: Translation<AbstractToPhysical<NumericType>>,
}

type AbstractToPhysical<AbstractType> =
    AbstractType extends Value ? Duration :
        AbstractType extends Pitch ? Tone :
            AbstractType extends Intensity ? Gain :
                AbstractType extends Position ? Location :
                    Number

export {
    Material,
    MaterializeEntities,
    MaterializeScales,
    Entity,
    Scale,
    AbstractToPhysical,
}
