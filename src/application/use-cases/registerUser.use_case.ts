import UserModel from '@domain/models/user.model.ts';

import { UserEmailIsAlreadyInUseException } from '@application/errors/userEmailIsAlreadyInUse.exception.ts';
import { UserIdIsAlreadyInUseException } from '@application/errors/userIdIsAlreadyInUse.exception.ts';
import { UserTagNameIsAlreadyInUseException } from '@application/errors/userTagNameIsAlreadyInUse.exception.ts';

import UserRepository from '@infrastructure/repositories/userRepository.ts';

import { type User } from '@prisma/index.d.ts';

export async function UserRegisterUseCase({
	bio,
	email,
	name,
	password,
	profileImage,
	tagName,
	id,
	numberOfPublications,
	publications,
}: User): Promise<void> {
	const newUser = await UserModel.createUser({
		bio,
		email,
		id,
		name,
		password,
		numberOfPublications,
		profileImage,
		tagName,
		publications,
	});
	const userRepository = new UserRepository();

	const existUserById = await userRepository.findUserById({
		userId: newUser.id,
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
}
