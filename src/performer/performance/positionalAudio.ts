import { Coordinate, Meters, notAs, Point, use, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { SourceNode } from './source'
import { ComputePositionalAudioParameters } from './types'

const setPosition: (positionNode: Object3D, position: Coordinate<Point<Meters>>) => void =
    (positionNode: Object3D, position: Coordinate<Point<Meters>>): void => {
        const rawPosition: number[] = position.map(notAs.Point)
        positionNode.position.set(
            use.Ordinal(rawPosition, X_AXIS) || 0,
            use.Ordinal(rawPosition, Y_AXIS) || 0,
            use.Ordinal(rawPosition, Z_AXIS) || 0,
        )
    }

const computePositionalAudio: (parameters: {
    position: Coordinate<Point<Meters>>,
    positionNode: Object3D,
    sourceNode: SourceNode,
    webVr: Vrb,
}) => PositionalAudio =
    ({ sourceNode, positionNode, webVr, position }: ComputePositionalAudioParameters): PositionalAudio => {
        const positionalAudio: PositionalAudio = webVr.createPositionalSound()
        // @ts-ignore
        positionalAudio.setNodeSource(sourceNode)
        positionNode.add(positionalAudio)
        setPosition(positionNode, position)

        return positionalAudio
    }

export {
    computePositionalAudio,
}
