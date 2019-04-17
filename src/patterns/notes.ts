import { apply, from, insteadOf, Ordinal, Scalar, to, Translation } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesTotalDurationByScalar: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationScalar: Scalar<Scalar> = duration && duration.scalar || to.Scalar<Scalar>(0)

                return apply.Translation(
                    accumulator,
                    insteadOf<Translation>(to.Translation(from.Scalar<Scalar>(durationScalar))),
                )
            },
            0,
        )

const computeNotesTotalDurationByIndex: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationIndex: Ordinal<Scalar> = duration && duration.index || to.Ordinal<Scalar>(0)

                return apply.Translation(
                    accumulator,
                    insteadOf<Translation>(to.Translation(from.Ordinal<Scalar>(durationIndex))),
                )
            },
            0,
        )

export {
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
}
