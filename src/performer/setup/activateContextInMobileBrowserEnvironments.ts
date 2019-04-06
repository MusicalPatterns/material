import { context } from '../performance'

const activateContextInMobileBrowserEnvironments: VoidFunction =
    (): void => {
        document.addEventListener('touchstart', async () => {
            await context.resume()
        })
    }

export {
    activateContextInMobileBrowserEnvironments,
}
