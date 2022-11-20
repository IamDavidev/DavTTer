import UserModel from '@domain/models/user.model.ts';

import { UserEmailIsAlreadyInUseException } from '@application/errors/userEmailIsAlreadyInUse.exception.ts';
import { UserIdIsAlreadyInUseException } from '@application/errors/userIdIsAlreadyInUse.exception.ts';
import { UserTagNameIsAlreadyInUseException } from '@application/errors/userTagNameIsAlreadyInUse.exception.ts';

import UserRepository from '@infrastructure/repositories/userRepository.ts';

export interface UserRegister {
	uuid: string;
	bio: string;
	email: string;
	name: string;
	numberOfPublications: number;
	password: string;
	profileImage: string | null;
	publications: string[] | [];
	tagName: string;
}

export async function userRegisterUseCase({
	bio,
	email,
	name,
	password,
	profileImage,
	tagName,
	uuid,
	numberOfPublications,
	publications,
}: UserRegister): Promise<void> {
	const newUser = await UserModel.createUser({
		bio,
		email,
		uuid,
		name,
		password,
		numberOfPublications,
		profileImage,
		tagName,
		publications,
	});
	const userRepository = new UserRepository();

	const existUserById = await userRepository.findUserByUUId({
		userUUId: newUser.uuid,
	});
	if (existUserById) throw new UserIdIsAlreadyInUseException();

	const existUserByEmail = await userRepository.findUserByEmail({
		email: newUser.email,
	});
	if (existUserByEmail) throw new UserEmailIsAlreadyInUseException();

	const existUserByTagName = await userRepository.findUserByTagName({
		tagName: newUser.tagName,
	});
	if (existUserByTagName) throw new UserTagNameIsAlreadyInUseException();

	await userRepository.createUser({ user: newUser });
}
