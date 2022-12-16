import { type RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';
import { v2 as cloudinaryApi } from 'npm:cloudinary@1.32.0';
import { join } from '$path/mod.ts';
import { Status } from '$http/http_status.ts';

import { EFormatImagePublication } from '@domain/interfaces/FormatImagePUblication.enum.ts';
import { IntDateVo } from '@domain/value_objects/intData.vo.ts';
import {
	EObjetFitImage,
	type IImagePublication,
} from '@domain/interfaces/ImagePublication.interface.ts';

import { type CreatePublicationUseCase } from '@application/use-cases/publicationCreate.use_case.ts';

import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '@infrastructure/errors/unnecesaryFields.exception.ts';
import { CreatePublicationRequest } from '@infrastructure/interfaces/Enpoints.types.ts';
import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';

const options = {
	api_key: Deno.env.get('API_KEY'),
	cloud_name: Deno.env.get('CLOUD_NAME'),
	api_secret: Deno.env.get('API_SECRET'),
};

cloudinaryApi.config(options);

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

		const { title, body, userUUId, uuid, ...restFields } = formData.fields;
		const newDate = new IntDateVo(new Date());

		const isValidFieldsToUploadImage =
			await this.createPublicationUseCase.preValidateFields({
				body,
				title,
				userUUId,
			});
		if (isValidFieldsToUploadImage) {
			response.status = Status.BadRequest;
			response.body = {
				message: 'Missing fields',
			};
			return;
		}
		if (!title || !body || !userUUId || !uuid)
			throw new MissignFieldsException();

		if (!formData?.files) return;
		if (Object.keys(restFields).length !== 0) {
			throw new UnnecesaryFieldsException();
		}

		const url = formData.files[0].filename || '';
		const originalNameImage = formData.files[0].originalName || '';
		const imageData = await cloudinaryApi.uploader
			.upload(url, {
				folder: 'davter/publications',
			})
			.then(res => res);

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
			createdAt: newDate.value,
			updatedAt: newDate.value,
			image,
			likes: 0,
			likesByUsers: [],
			userUUId,
			uuid: uuid,
			format: imageData.format as EFormatImagePublication,
		});

		response.status = Status.Created;
		response.body = {
			status: Status.Created,
			message: 'Publication created',
		};
	}
}
