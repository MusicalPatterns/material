import { as, insteadOf, notAs, Ordinal, Scalar, Translation, use } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesTotalDurationByScalar: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationScalar: Scalar<Scalar> = duration && duration.scalar || as.Scalar<Scalar>(0)

                return use.Translation(
                    accumulator,
                    insteadOf<Translation>(as.Translation(notAs.Scalar<Scalar>(durationScalar))),
                )
            },
            0,
        )

const computeNotesTotalDurationByIndex: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationIndex: Ordinal<Scalar> = duration && duration.index || as.Ordinal<Scalar>(0)

                return use.Translation(
                    accumulator,
                    insteadOf<Translation>(as.Translation(notAs.Ordinal<Scalar>(durationIndex))),
                )
            },
            0,
        )

export {
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
}
