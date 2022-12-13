import { v2 as cloudinaryApi } from 'npm:cloudinary@1.32.0';

const options = {
	api_key: Deno.env.get('API_KEY'),
	cloud_name: Deno.env.get('CLOUD_NAME'),
	api_secret: Deno.env.get('API_SECRET'),
};
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
import { BodyVo } from '../../../domain/value_objects/Body.vo.ts';
import { TitleVo } from '../../../domain/value_objects/title.vo.ts';
import { IntDateVo } from '../../../domain/value_objects/intData.vo.ts';
import { EFormatImagePublication } from '../../../domain/interfaces/FormatImagePUblication.enum.ts';

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
			// resolve the file path
			outPath: join(Deno.cwd(), 'uploads'),
		});

		const { title, body, userUUId, uuid, ...restFields } = formData.fields;
		const bodyParse = new BodyVo(body);
		const titleParse = new TitleVo(title);
		const newDate = new IntDateVo(new Date());

		if (!title || !body || !userUUId || !uuid)
			throw new MissignFieldsException();

		if (!formData?.files) return;
		if (Object.keys(restFields).length !== 0) {
			throw new UnnecesaryFieldsException();
		}

		const existingUserUUId =
			await this.createPublicationUseCase.verifyIfExisUserUUId({
				userUUId: userUUId,
			});

		if (existingUserUUId === false) {
			response.status = Status.BadRequest;
			response.body = {
				message: 'User id not found',
			};
			return;
		}

		const url = formData.files[0].filename || '';
		const originalNameImage = formData.files[0].originalName || '';
		const imageData = await cloudinaryApi.uploader
			.upload(url, {
				folder: 'davter/publications',
			})
			.then(res => res);
		console.info(
			'🚀 ~>  file: createPublication.controller.ts:84 ~>  CreatePublicationController ~>  imageData',
			imageData
		);

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
			title: titleParse.value,
			body: bodyParse.value,
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
