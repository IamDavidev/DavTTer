import { type BodyJson } from '$oak/body.ts';
import { type RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { RegisterUserUseCase } from '@application/use-cases/registerUser.use_case.ts';

import { type UserController } from '@infrastructure/interfaces/UserController.type.ts';
import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '@infrastructure/errors/unnecesaryFields.exception.ts';
import { RouteRegisterUser } from '@infrastructure/interfaces/Enpoints.types.ts';
import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { typeBody } from '@infrastructure/interfaces/typeBody.enum.ts';

@injectable()
export class RegisterUserController {
	constructor(
		@inject(useCasesSymbols.registerUserUseCase)
		private registerUserUseCase: RegisterUserUseCase
	) {}

	async execute({
		request,
		response,
	}: RouterContext<RouteRegisterUser>): UserController {
		const rawBody = request.body({
			type: typeBody.JSON,
		}) as BodyJson;

		const {
			uuid,
			bio,
			email,
			name,
			password,
			profileImage,
			tagName,
			...restFields
		} = await rawBody.value;

		// missign fields
		if (
			!uuid ||
			!bio ||
			!email ||
			!name ||
			!password ||
			!profileImage ||
			!tagName
		)
			throw new MissignFieldsException();

		// unnecesary fields
		if (Object.keys(restFields).length !== 0)
			throw new UnnecesaryFieldsException();

		await this.registerUserUseCase.execute({
			uuid,
			bio,
			email,
			name,
			numberOfPublications: 0,
			password,
			profileImage,
			publications: [],
			tagName,
		});

		response.status = 201;
		response.body = 'User created';
	}
}
