import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import UserModel from '@domain/models/user.model.ts';

import { UserEmailIsAlreadyInUseException } from '@application/errors/userEmailIsAlreadyInUse.exception.ts';
import { UserIdIsAlreadyInUseException } from '@application/errors/userIdIsAlreadyInUse.exception.ts';
import { userWithVOsAdapter } from '@application/adapters/UserModel.adapter.ts';
import { UserTagNameIsAlreadyInUseException } from '@application/errors/userTagNameIsAlreadyInUse.exception.ts';
import { type UserRegister } from '@application/interfacs/UserRegister.interface.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';

@injectable()
export class RegisterUserUseCase {
	private _userRepository: IUserRepository;
	constructor(
		@inject(repositoriesSymbols.userRepository) UserRepository: IUserRepository
	) {
		this._userRepository = UserRepository;
	}

	async execute(userRegister: UserRegister): Promise<void> {
		const newUserModel: UserModel = UserModel.create(
			await userWithVOsAdapter(userRegister)
		);

		const existUserByUUid = await this._userRepository.findByUUId({
			userUUId: newUserModel.uuid,
		});
		if (existUserByUUid) throw new UserIdIsAlreadyInUseException();

		const existUserByEmail = await this._userRepository.findByEmail({
			userEmail: newUserModel.email,
		});
		if (existUserByEmail) throw new UserEmailIsAlreadyInUseException();

		const existUserByTagName = await this._userRepository.findByTagName({
			userTagName: newUserModel.tagName,
		});
		if (existUserByTagName) throw new UserTagNameIsAlreadyInUseException();

		await this._userRepository.create({
			user: newUserModel,
		});
	}
}
