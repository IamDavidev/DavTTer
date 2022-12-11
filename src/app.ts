import { Application } from '$oak/mod.ts';
import { config as initDotenvConfig } from 'npm:dotenv@16.0.3';
import 'npm:reflect-metadata@0.1.13';

import { router } from '@infrastructure/clients/router.ts';
import { errorMiddleware } from '@infrastructure/middlewares/error.middleware.ts';
import '@infrastructure/routes/user.routes.ts';
import { logger } from '@infrastructure/clients/logger.client.ts';

export const app: Application = new Application();

initDotenvConfig();

const abortController: AbortController = new AbortController();

async function $bootstrap(abortController: AbortController): Promise<void> {
	app.use(errorMiddleware);
	app.use(router.routes());
	app.use(router.allowedMethods());

	try {
		app.addEventListener('listen', () => {
			logger.info('Server started on port 8080');
		});

		await app.listen({
			port: 8080,
			signal: abortController.signal,
		});
	} catch (err) {
		abortController.abort();
		logger.error(err);
		app.removeEventListener('listen', () => {
			logger.info('Remove listener on port 8080');
		});
	}
}

$bootstrap(abortController);
