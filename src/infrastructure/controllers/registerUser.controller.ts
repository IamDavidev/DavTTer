import { RouterContext } from '$oak/router.ts';

import { RegisterUserRequest } from '@infrastructure/interfaces/Enpoints.types.ts';
import { userRegisterUseCase } from '@application/use-cases/registerUser.use_case.ts';
import { logger } from '@infrastructure/clients/logger.client.ts';
import { MissignFieldsException } from '../errors/missingFields.exception.ts';
import { UnnecesaryFieldsException } from '../errors/unnecesaryFields.exception.ts';

export async function registerUserController({
	request,
	response,
}: RouterContext<RegisterUserRequest>) {
	const { uuid, bio, email, name, password, profileImage, tagName } =
		await request.body({
			type: 'json',
		}).value;

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
	if (Object.keys(request.body).length > 7)
		throw new UnnecesaryFieldsException();

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
