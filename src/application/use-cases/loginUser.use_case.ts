import { compare as compareHashPassword } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { InvalidLoginException } from '@application/errors/invalidLogin.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';

@injectable()
export class LoginUserUseCase {
	constructor(
		@inject(repositoriesSymbols.userRepository)
		private userRepository: IUserRepository
	) {}

	public async execute({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) {
		console.log('user Login...');
		const existUserWithEmail = await this.userRepository.findByEmail({
			userEmail: email,
		});
		if (existUserWithEmail === null) throw new InvalidLoginException();
		const isPasswordValid = await compareHashPassword(
			password,
			existUserWithEmail.password
		);
		if (isPasswordValid === false) throw new InvalidLoginException();

		return existUserWithEmail.uuid;
	}

	public printWork() {
		console.log('LoginUserUseCase printWork');
	}
}
