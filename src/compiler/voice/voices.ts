import { as, insteadOf, map, ofNotAs, Ordinal } from '@musical-patterns/utilities'
import { CompiledPattern } from '../../interface'
import { Voice } from '../../performer'
import { Entity, Scales } from '../../types'
import { applyCollectiveInfos, computeCollectiveInfos } from './collective'
import { computeIndividualVoiceAndInfo, IndividualVoiceAndInfo } from './individual'
import { CompileVoicesParameters } from './types'

const compileVoices: (parameters: { entities: Entity[], scales?: Scales }) => CompiledPattern =
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
            (
                { voice, voiceInfo: { sectionInfos, individualSegnoTime } }: IndividualVoiceAndInfo,
                index: Ordinal<IndividualVoiceAndInfo[]>,
            ) =>
                applyCollectiveInfos({
                    collectiveEndTime,
                    collectiveSegnoTime,
                    collectiveShareSegnoTime,
                    entities,
                    entityIndex: insteadOf<Ordinal, Entity[], IndividualVoiceAndInfo[]>(index),
                    individualSegnoTime,
                    scales,
                    sectionInfos,
                    voice,
                }),
        )

        return {
            segnoTime: collectiveSegnoTime,
            totalDuration: as.Translation(ofNotAs(collectiveEndTime)),
            voices,
        }
    }

export {
    compileVoices,
}
