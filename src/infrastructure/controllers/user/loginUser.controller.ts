import { RouterContext } from 'https://deno.land/x/oak@v11.1.0/router.ts';

import { loginUserUseCase } from '@application/use-cases/loginUser.use_case.ts';

import { MissignFieldsException } from '@infrastructure/errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '@infrastructure/errors/unnecesaryFields.exception.ts';
import { LoginUserRequest } from '@infrastructure/interfaces/Enpoints.types.ts';
import { getJWT } from '../../services/getJWT.service.ts';

export async function loginUserController({
	request,
	response,
}: RouterContext<LoginUserRequest>) {
	const { email, password, ...restFields } = await request.body({
		type: 'json',
	}).value;

	if (!email || !password) throw new MissignFieldsException();

	if (Object.keys(restFields).length !== 0)
		throw new UnnecesaryFieldsException();

	const userUUId = await loginUserUseCase({
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
		toke: JWToken,
	};
}
