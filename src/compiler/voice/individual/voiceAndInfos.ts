import { to } from '@musical-patterns/utilities'
import { SourceRequest, Voice } from '../../../performer'
import { compileSourceRequest } from '../../source'
import { Entity, Scale } from '../../types'
import { CompileVoiceParameters } from '../types'
import { TEMPORARY_UNDEFINED_SEGNO_INDEX } from './constants'
import { computeIndividualVoiceInfo } from './infos'
import { computeIndividualSoundsAndSectionInfos } from './sections'
import { IndividualVoiceAndInfo, IndividualVoiceInfo, SoundsAndSectionInfos } from './types'

const computeIndividualVoiceAndInfo:
    (parameters: { entity: Entity, scales?: Scale[] }) => IndividualVoiceAndInfo =
    ({ entity, scales }: CompileVoiceParameters): IndividualVoiceAndInfo => {
        const { delay = to.Ms(0), sections = [], timbreName } = entity

        const sourceRequest: SourceRequest = compileSourceRequest(timbreName)
        const { sounds, sectionInfos }: SoundsAndSectionInfos =
            computeIndividualSoundsAndSectionInfos(sections, { scales })
        const voice: Voice = { delay, sounds, sourceRequest, segnoIndex: TEMPORARY_UNDEFINED_SEGNO_INDEX }
        const voiceInfo: IndividualVoiceInfo = computeIndividualVoiceInfo(sectionInfos)

        return { voice, voiceInfo }
    }

export {
    computeIndividualVoiceAndInfo,
}
