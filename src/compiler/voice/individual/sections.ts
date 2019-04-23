import { isUndefined, Ms, ONCE, repeat, Translation } from '@musical-patterns/utilities'
import { Sound } from '../../../performer'
import { compileSounds, CompileSoundsOptions } from '../../sound'
import { computeSoundsDuration } from '../totalCompiledDuration'
import { Section } from '../types'
import { SectionInfo, SoundsAndSectionInfos } from './types'

const computeIndividualSoundsAndSectionInfos:
    (sections: Section[], options: CompileSoundsOptions) => SoundsAndSectionInfos =
    (sections: Section[], options: CompileSoundsOptions): SoundsAndSectionInfos => {
        const sectionInfos: SectionInfo[] = []

        const sounds: Sound[] = sections.reduce(
            (accumulator: Sound[], { notes = [], repetitions }: Section) => {
                const sectionSounds: Sound[] = repeat(
                    compileSounds(notes, options),
                    repetitions || ONCE,
                )

                const totalDuration: Translation<Ms> = computeSoundsDuration(sectionSounds)

                const sectionInfo: SectionInfo = {
                    doesRepeatForever: isUndefined(repetitions),
                    totalDuration,
                }
                sectionInfos.push(sectionInfo)

                return accumulator.concat(sectionSounds)
            },
            [],
        )

        return { sounds, sectionInfos }
    }

export {
    computeIndividualSoundsAndSectionInfos,
}
