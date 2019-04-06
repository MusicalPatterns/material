import { elementExists, Ms, sleep, to } from '@musical-patterns/utilities'
import { page } from '../setup'

const FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING: Ms = to.Ms(100)

describe('it compiles', () => {
    it('since worker files can be a bit finnicky, and i cannot test in node, confirm that the code compiles', async (done: DoneFn) => {
        await sleep(FOR_SOME_REASON_WE_NEED_TO_WAIT_A_SPLIT_SECOND_BEFORE_CHECKING)
        expect(await elementExists(page, 'button'))
            .toBeTruthy()

        done()
    })
})
