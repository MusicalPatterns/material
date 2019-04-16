import { apply, from, Index, insteadOf, Scalar, to, Translation } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesTotalDurationByScalar: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationScalar: Scalar<Scalar> = duration && duration.scalar || to.Scalar(0)

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
                const durationIndex: Index<Scalar> = duration && duration.index || to.Index<Scalar>(0)

                return apply.Translation(
                    accumulator,
                    insteadOf<Translation>(to.Translation(from.Index<Scalar>(durationIndex))),
                )
            },
            0,
        )

export {
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
}
