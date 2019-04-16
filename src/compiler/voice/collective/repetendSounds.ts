import { apply, forEach, Index, insteadOf, isEmpty, isUndefined, Maybe } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'
import { compileSounds, Note } from '../../sound'
import { NOT_FOUND } from '../constants'
import { SectionInfo } from '../individual'
import { Section } from '../types'
import { ComputeRepetendSoundsParameters } from './types'

const computeRepetendIndex: (sectionInfos: SectionInfo[]) => Index<Section> =
    (sectionInfos: SectionInfo[]): Index<Section> => {
        let repetendIndex: Index<Section> = NOT_FOUND
        forEach(sectionInfos, (sectionInfo: SectionInfo, index: Index<SectionInfo>) => {
            if (sectionInfo.doesRepeatForever) {
                repetendIndex = insteadOf<Index, Section>(index)
            }
        })

        return repetendIndex
    }

const computeRepetendSounds:
    (parameters: ComputeRepetendSoundsParameters) => Maybe<Sound[]> =
    ({ sectionInfos, scales, sections }: ComputeRepetendSoundsParameters): Maybe<Sound[]> => {
        const repetendIndex: Index<Section> = computeRepetendIndex(sectionInfos)
        if (repetendIndex === NOT_FOUND) {
            return undefined
        }

        const repetend: Section = isEmpty(sections) ? {} : apply.Index(sections, repetendIndex)
        const repetendNotes: Maybe<Note[]> = repetend.notes
        if (isUndefined(repetendNotes) || isEmpty(repetendNotes)) {
            throw new Error('Repetend was empty or undefined')
        }

        return compileSounds(repetendNotes, { scales })
    }

export {
    computeRepetendSounds,
}
