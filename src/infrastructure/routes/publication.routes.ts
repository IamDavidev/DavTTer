import { type RouterContext } from '$oak/router.ts';

import { router } from '@infrastructure/clients/router.ts';
import { CREATE_PUBLICATION_ENDPOINT } from '@shared/constants/enpoitns.const.ts';
import { CreatePublicationRequest } from '@infrastructure/interfaces/Enpoints.types.ts';

router.post(
	CREATE_PUBLICATION_ENDPOINT,
	({ request }: RouterContext<CreatePublicationRequest>) => {
		console.info('🚀 ~>  file: publication.routes.ts:9 ~>  ctx', request);
		console.log('hola');
	}
);
