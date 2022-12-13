import { v2 as cloudinaryApi } from 'npm:cloudinary@1.32.0';

const options = {
	api_key: Deno.env.get('API_KEY'),
	cloud_name: Deno.env.get('CLOUD_NAME'),
	api_secret: Deno.env.get('API_SECRET'),
};
console.log(options);

cloudinaryApi.config(options);

import { type RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import {
	EObjetFitImage,
	type IImagePublication,
} from '@domain/interfaces/ImagePublication.interface.ts';

import { type CreatePublicationUseCase } from '@application/use-cases/publicationCreate.use_case.ts';

import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '@infrastructure/errors/unnecesaryFields.exception.ts';
import { CreatePublicationRequest } from '@infrastructure/interfaces/Enpoints.types.ts';
import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { join } from 'https://deno.land/std@0.161.0/path/mod.ts';
import { Status } from 'https://deno.land/std@0.67.0/http/http_status.ts';

console.log('joinDeno', join(Deno.cwd(), 'uploads'));

@injectable()
export class CreatePublicationController {
	constructor(
		@inject(useCasesSymbols.createPublicationUseCase)
		private createPublicationUseCase: CreatePublicationUseCase
	) {}

	public async execute({
		request,
		response,
	}: RouterContext<CreatePublicationRequest>) {
		const formDataReader = request.body({ type: 'form-data' }).value;
		const formData = await formDataReader.read({
			outPath: join(Deno.cwd(), 'uploads'),
		});
		console.info(
			'🚀 ~>  file: createPublication.controller.ts:47 ~>  CreatePublicationController ~>  formData',
			formData
		);

		const { title, body, userId } = formData.fields;

		if (!title || !body || !userId) throw new MissignFieldsException();

		if (!formData?.files) return;
		if (Object.keys(formData.fields).length !== 0) {
			throw new UnnecesaryFieldsException();
		}

		const url = formData.files[0].filename || '';
		const originalNameImage = formData.files[0].originalName || '';
		const imageData = await cloudinaryApi.uploader
			.upload(url, {
				folder: 'davter/publications',
			})
			.then(res => res);

		// add id -> imageData.public_id
		// add format -> imageData.format with accept jpg, png, gif, svg, webp

		const objectFit =
			imageData.height > imageData.width
				? EObjetFitImage.CONTAIN
				: EObjetFitImage.COVER;

		const image: IImagePublication = {
			alt: originalNameImage,
			height: imageData.height,
			objectFit: objectFit,
			url: imageData.url,
			width: imageData.width,
		};

		await this.createPublicationUseCase.execute({
			title,
			body,
			createdAt: new Date(),
			updatedAt: new Date(),
			image,
			likes: 0,
			likesByUsers: [],
			userId: userId,
			uuid: '',
		});

		response.status = Status.Created;
		response.body = {
			status: Status.Created,
			message: 'Publication created',
		};
	}
}
