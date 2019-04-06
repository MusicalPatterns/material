import { Cardinal } from '@musical-patterns/utilities'
import { Note } from '../sound'
import { Entity, Scale } from '../types'

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
