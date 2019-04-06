import { map, Ordinal } from '@musical-patterns/utilities'
import { CompiledPattern, Voice } from '../../performer'
import { Entity, Scale } from '../types'
import { applyCollectiveInfos, computeCollectiveInfos } from './collective'
import { computeIndividualVoiceAndInfo, IndividualVoiceAndInfo } from './individual'
import { CompileVoicesParameters } from './types'

const compileVoices: (parameters: { entities: Entity[], scales?: Scale[] }) => CompiledPattern =
    ({ entities, scales }: CompileVoicesParameters): CompiledPattern => {
        const individualVoicesAndInfos: IndividualVoiceAndInfo[] = entities.map((entity: Entity) =>
            computeIndividualVoiceAndInfo({ entity, scales }),
        )

        const {
            collectiveEndTime,
            collectiveSegnoTime,
            collectiveShareSegnoTime,
        } = computeCollectiveInfos(individualVoicesAndInfos)

        const voices: Voice[] = map(
            individualVoicesAndInfos,
            ({ voice, voiceInfo: { sectionInfos, individualSegnoTime } }: IndividualVoiceAndInfo, index: Ordinal) =>
                applyCollectiveInfos({
                    collectiveEndTime,
                    collectiveSegnoTime,
                    collectiveShareSegnoTime,
                    entities,
                    index,
                    individualSegnoTime,
                    scales,
                    sectionInfos,
                    voice,
                }),
        )

        return {
            segnoTime: collectiveSegnoTime,
            totalDuration: collectiveEndTime,
            voices,
        }
    }

export {
    compileVoices,
}
