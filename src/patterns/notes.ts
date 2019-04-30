import { as, Ordinal, Scalar, use, Value } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesValueScalarSum: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { value }: Note): number => {
                const valueScalar: Scalar<Value> = value && value.scalar || as.Scalar<Value>(0)

                return use.Translation(
                    accumulator,
                    as.Translation(as.number(valueScalar)),
                )
            },
            0,
        )

const computeNotesValueIndexSum: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { value }: Note): number => {
                const valueIndex: Ordinal<Array<Scalar<Value>>> =
                    value && value.index || as.Ordinal<Array<Scalar<Value>>>(0)

                return use.Translation(
                    accumulator,
                    as.Translation(as.number(valueIndex)),
                )
            },
            0,
        )

export {
    computeNotesValueIndexSum,
    computeNotesValueScalarSum,
}
