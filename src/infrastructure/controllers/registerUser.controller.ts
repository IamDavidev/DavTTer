import { RouterContext } from '$oak/router.ts';

import { RegisterUserRequest } from '@infrastructure/interfaces/Enpoints.types.ts';
import { userRegisterUseCase } from '@application/use-cases/registerUser.use_case.ts';

export async function registerUserController({
	request,
	response,
}: RouterContext<RegisterUserRequest>) {
	const { uuid, bio, email, name, password, profileImage, tagName } =
		await request.body({
			type: 'json',
		}).value;

	await userRegisterUseCase({
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
