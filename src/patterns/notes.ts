import { as, Duration,  Ordinal, Scalar, use } from '@musical-patterns/utilities'
import { Note } from '../compiler'

const computeNotesTotalDurationByScalar: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationScalar: Scalar<Duration> = duration && duration.scalar || as.Scalar<Duration>(0)

                return use.Translation(
                    accumulator,
                    as.Translation(as.number(durationScalar)),
                )
            },
            0,
        )

const computeNotesTotalDurationByIndex: (notes: Note[]) => number =
    (notes: Note[]): number =>
        notes.reduce(
            (accumulator: number, { duration }: Note): number => {
                const durationIndex: Ordinal<Array<Scalar<Duration>>> =
                    duration && duration.index || as.Ordinal<Array<Scalar<Duration>>>(0)

                return use.Translation(
                    accumulator,
                    as.Translation(as.number(durationIndex)),
                )
            },
            0,
        )

export {
    computeNotesTotalDurationByIndex,
    computeNotesTotalDurationByScalar,
}
