import { as, Coordinate, Location, use, X_AXIS, Y_AXIS, Z_AXIS } from '@musical-patterns/utilities'
import { Object3D, PositionalAudio } from 'three'
import { Vrb } from 'vrb'
import { SourceNode } from './source'
import { ComputePositionalAudioParameters } from './types'

const setPosition: (positionNode: Object3D, location: Coordinate<Location>) => void =
    (positionNode: Object3D, location: Coordinate<Location>): void => {
        const rawPosition: number[] = location.map(as.number)
        positionNode.position.set(
            use.Ordinal(rawPosition, X_AXIS) || 0,
            use.Ordinal(rawPosition, Y_AXIS) || 0,
            use.Ordinal(rawPosition, Z_AXIS) || 0,
        )
    }

const computePositionalAudio: (parameters: {
    location: Coordinate<Location>,
    positionNode: Object3D,
    sourceNode: SourceNode,
    webVr: Vrb,
}) => PositionalAudio =
    ({ sourceNode, positionNode, webVr, location }: ComputePositionalAudioParameters): PositionalAudio => {
        const positionalAudio: PositionalAudio = webVr.createPositionalSound()
        // @ts-ignore
        positionalAudio.setNodeSource(sourceNode)
        positionNode.add(positionalAudio)
        setPosition(positionNode, location)

        return positionalAudio
    }

export {
    computePositionalAudio,
}
