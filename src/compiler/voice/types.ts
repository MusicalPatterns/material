import { Cardinal } from '@musical-patterns/utilities'
import { Entity, Scales } from '../../types'
import { Note } from '../sound'

interface Section {
    notes?: Note[],
    repetitions?: Cardinal,
}

interface CompileVoiceParameters {
    entity: Entity,
    scales?: Scales,
}

interface CompileVoicesParameters {
    entities: Entity[],
    scales?: Scales,
}

export {
    Section,
    CompileVoiceParameters,
    CompileVoicesParameters,
}
