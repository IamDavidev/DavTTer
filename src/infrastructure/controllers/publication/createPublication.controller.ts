import { type RouterContext } from '$oak/router.ts';
import { injectable, inject } from '@shared/packages/npm/inversify.package.ts';

import { type CreatePublicationUseCase } from '@application/use-cases/publicationCreate.use_case.ts';

import {
	EObjetFitImage,
	type IImagePublication,
} from '@domain/interfaces/ImagePublication.interface.ts';

import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';

const STATUS_PUBLICATION_CREATED = 201;
const MESSAGE_PUBLICATION_CREATED = 'Publication created';
@injectable()
export class CreatePublicationController {
	constructor(
		@inject(useCasesSymbols.createPublicationUseCase)
		private createPublicationUseCase: CreatePublicationUseCase
	) {}

	public async execute({ response, request }: RouterContext<''>) {
		const { title, body, ...restFields } = await request.body({ type: 'json' })
			.value;

		if (!title || !body) throw new MissignFieldsException();

		if (Object.keys(restFields).length !== 0) {
			throw new MissignFieldsException();
		}

		const _image: IImagePublication = {
			alt: 'alt',
			height: 100,
			objectFit: EObjetFitImage.CONTAIN,
			url: 'url',
			width: 100,
		};

		// await this.createPublicationUseCase.execute({
		// 	title,
		// 	body,
		// 	createdAt: new Date(),
		// 	updatedAt: new Date(),
		// 	image,
		// 	likes: 0,
		// 	likesByUsers: [],
		// 	userId: 'userId',
		// 	uuid: '',
		// });
		response.status = STATUS_PUBLICATION_CREATED;
		response.body = MESSAGE_PUBLICATION_CREATED;
	}
}
