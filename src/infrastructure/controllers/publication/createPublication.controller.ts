import { type RouterContext } from '$oak/router.ts';

export class CreatePublicationController {
	constructor() {}

	public async execute({ response, request }: RouterContext<''>) {
		console.info(
			'🚀 ~>  file: createPublication.controller.ts:7 ~>  CreatePublicationController ~>  execute ~>  request',
			request
		);
		console.info(
			'🚀 ~>  file: createPublication.controller.ts:7 ~>  CreatePublicationController ~>  execute ~>  response',
			response
		);
		await console.log('hola');
	}
}
