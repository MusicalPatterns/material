import { Cardinal } from '@musical-patterns/utilities'
import { Entity, Scale } from '../../types'
import { Note } from '../sound'

interface Section {
    notes?: Note[],
    repetitions?: Cardinal,
}

interface CompileVoiceParameters {
    entity: Entity,
    scales?: Scale[]
}

interface CompileVoicesParameters {
    entities: Entity[],
    scales?: Scale[]
}

export {
    Section,
    CompileVoiceParameters,
    CompileVoicesParameters,
}
