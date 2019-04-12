import { apply, from, Index, Scalar, to } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesTotalDurationByScalar: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationScalar: Scalar = duration && duration.scalar || to.Scalar(0)

                return apply.Translation(
                    accumulator,
                    to.Translation(from.Scalar<number, Scalar>(durationScalar)),
                )
            },
            0,
        )

const computeNotesTotalDurationByIndex: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationIndex: Index = duration && duration.index || to.Index(0)

                return apply.Translation(
                    accumulator,
                    to.Translation((from.Index(durationIndex))),
                )
            },
            0,
        )

export {
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
}
