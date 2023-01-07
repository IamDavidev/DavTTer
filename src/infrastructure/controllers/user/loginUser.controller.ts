import { type BodyJson } from '$oak/body.ts';
import { type RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { LoginUserUseCase } from '@application/use-cases/loginUser.use_case.ts';

import { type UserController } from '@infrastructure/interfaces/UserController.type.ts';
import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '@infrastructure/errors/unnecesaryFields.exception.ts';
import { RouteLoginUser } from '@infrastructure/interfaces/Enpoints.types.ts';
import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { getJWT } from '@infrastructure/services/getJWT.service.ts';
import { typeBody } from '@infrastructure/interfaces/typeBody.enum.ts';

@injectable()
export class LoginUserController {
	constructor(
		@inject(useCasesSymbols.loginUserUseCase)
		private loginUserUseCase: LoginUserUseCase
	) {}

	async execute({
		request,
		response,
	}: RouterContext<RouteLoginUser>): UserController {
		const rawBody = request.body({
			type: typeBody.JSON,
		}) as BodyJson;

		const { email, password, ...restFields } = await rawBody.value;

		if (!email || !password) throw new MissignFieldsException();

		if (Object.keys(restFields).length !== 0)
			throw new UnnecesaryFieldsException();

		const userUUId = await this.loginUserUseCase.execute({
			email,
			password,
		});

		const payload = { uuid: userUUId };

		const JWToken = await getJWT(
			{
				alg: 'HS512',
				typ: 'JWT',
			},
			payload
		);

		response.status = 200;
		response.body = {
			token: JWToken,
		};
	}
}
