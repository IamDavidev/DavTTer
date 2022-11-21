import { compare as compareHashPassword } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import { InvalidLoginException } from '@application/errors/invalidLogin.ts';

import UserRepository from '@infrastructure/repositories/userRepository.ts';

export async function loginUserUseCase({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<string> {
	const userRepository = new UserRepository();

	const exitingUserWithEmail = await userRepository.findUserByEmail({
		email,
	});
	if (exitingUserWithEmail === null) throw new InvalidLoginException();

	const isPasswordCorrect = await compareHashPassword(
		password,
		exitingUserWithEmail.password
	);
	if (isPasswordCorrect === false) throw new InvalidLoginException();

	return exitingUserWithEmail.uuid;
}
