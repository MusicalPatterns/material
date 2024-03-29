import { Duration, elementExists, musicalAs, sleep } from '@musical-patterns/utilities'
import { page } from '../setup'

const FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING: Duration = musicalAs.Duration(100)

describe('it starts', (): void => {
    it('since worker files can be a bit finicky, and I cannot test in node, confirm that the code runs', async (): Promise<void> => {
        await sleep(FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING)
        expect(await elementExists(page, 'button'))
            .toBeTruthy()
    })
})
