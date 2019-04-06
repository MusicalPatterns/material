import { apply, forEach, isEmpty, isUndefined, Maybe, Ordinal } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'
import { compileSounds, Note } from '../../sound'
import { NOT_FOUND } from '../constants'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { ComputeRepetendSoundsParameters } from './types'

const computeRepetendIndex: (sectionInfos: SectionInfo[]) => Ordinal =
    (sectionInfos: SectionInfo[]): Ordinal => {
        let repetendIndex: Ordinal = NOT_FOUND
        forEach(sectionInfos, (sectionInfo: SectionInfo, index: Ordinal) => {
            if (sectionInfo.doesRepeatForever) {
                repetendIndex = index
            }
        })

        return repetendIndex
    }

const computeRepetendSounds:
    (parameters: ComputeRepetendSoundsParameters) => Maybe<Sound[]> =
    ({ sectionInfos, scales, sections }: ComputeRepetendSoundsParameters): Maybe<Sound[]> => {
        const repetendIndex: Ordinal = computeRepetendIndex(sectionInfos)
        if (repetendIndex === NOT_FOUND) {
            return undefined
        }

        const repetend: Section = isEmpty(sections) ? {} : apply.Ordinal(sections, repetendIndex)
        const repetendNotes: Maybe<Note[]> = repetend.notes
        if (isUndefined(repetendNotes) || isEmpty(repetendNotes)) {
            throw new Error('Repetend was empty or undefined')
        }

        return compileSounds(repetendNotes, { scales })
    }

export {
    computeRepetendSounds,
}
