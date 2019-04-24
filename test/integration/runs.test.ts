import { as, elementExists, Ms, sleep, Translation } from '@musical-patterns/utilities'
import { page } from '../setup'

const FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING: Translation<Ms> = as.Translation<Ms>(100)

describe('it runs', () => {
    it('since worker files can be a bit finnicky, and i cannot test in node, confirm that the code runs', async (done: DoneFn) => {
        await sleep(FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING)
        expect(await elementExists(page, 'button'))
            .toBeTruthy()

        done()
    })
})
