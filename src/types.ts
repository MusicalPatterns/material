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
import { AbstractName, Section, TimbreName } from './compiler'

interface Material {
    materializeEntities: MaterializeEntities,
    materializeScales?: MaterializeScales,
}

type MaterializeEntities = (specs?: any) => Entity[]
type MaterializeScales = (specs?: any) => Scales

type Entity = Partial<{
    delay: Duration,
    sections: Section[],
    timbreName: TimbreName,
}>

type Scale<NumericType extends Number = number> = Partial<{
    basis: AbstractToPhysical<NumericType>,
    scalars: Array<Scalar<NumericType>>,
    translation: Translation<AbstractToPhysical<NumericType>>,
}>

type Scales = Partial<{
    [ AbstractName.INTENSITY ]: Array<Scale<Intensity>>,
    [ AbstractName.PITCH ]: Array<Scale<Pitch>>,
    [ AbstractName.POSITION ]: Array<Scale<Position>>,
    [ AbstractName.VALUE ]: Array<Scale<Value>>,
    // tslint:disable-next-line max-union-size
}> & Partial<{ [Index in Partial<AbstractName>]: Array<Scale<Intensity | Pitch | Position | Value>> }>

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
    Scales,
}
