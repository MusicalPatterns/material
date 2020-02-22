import { context } from '../performance'

const activateContextInMobileBrowserEnvironments: VoidFunction =
    (): void => {
        document.addEventListener('touchstart', async (): Promise<void> => {
            await context.resume()
        })
    }

export {
    activateContextInMobileBrowserEnvironments,
}
