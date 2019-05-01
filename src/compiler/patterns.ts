import { CompiledPattern } from '../interface'
import { Entity, Material, Scales } from '../types'
import { CompilePatternParameters } from './types'
import { compileVoices } from './voice'

const compilePattern: (compilePatternParameters: {
    material: Material,
    // tslint:disable-next-line no-any
    spec?: { initialSpecs: any },
    // tslint:disable-next-line no-any
    specs?: any,
}) => Promise<CompiledPattern> =
    async ({ specs, material, spec }: CompilePatternParameters): Promise<CompiledPattern> => {
        // tslint:disable-next-line no-any
        const specsToCompileWith: any = specs || spec && spec.initialSpecs

        const { materializeEntities, materializeScales }: Material = material

        const entities: Entity[] = materializeEntities(specsToCompileWith)
        const scales: Scales = materializeScales ? materializeScales(specsToCompileWith) : {}

        return compileVoices({ entities, scales })
    }

export {
    compilePattern,
}
