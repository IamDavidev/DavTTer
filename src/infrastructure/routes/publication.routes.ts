import { CREATE_PUBLICATION_ENDPOINT } from '@shared/constants/enpoitns.const.ts';

import { router } from '@infrastructure/clients/router.ts';
import container from '@infrastructure/config/inversify.config.ts';
import { CreatePublicationController } from '@infrastructure/controllers/publication/createPublication.controller.ts';
import { controllersSymbols } from '@infrastructure/interfaces/controllers.symbol.ts';

console.log('🚀 CREATE_PUBLICATION_ENDPOINT ~~>', CREATE_PUBLICATION_ENDPOINT);

const createPublicationController = container.get<CreatePublicationController>(
	controllersSymbols.createPublicationController
);

router
	.post(
		CREATE_PUBLICATION_ENDPOINT,
		createPublicationController.execute.bind(createPublicationController)
	)
	.get('/test', ctx => {
		ctx.response.body = 'ok';
		ctx.response.status = 200;
	});
