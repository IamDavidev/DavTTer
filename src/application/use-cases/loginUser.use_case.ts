import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { PasswordVo } from '@domain/value_objects/password.vo.ts';
import { ValueObjectFormatException } from '@domain/errors/valueObjectFormat.exception.ts';

import { InvalidLoginException } from '@application/errors/invalidLogin.ts';

import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { PlainPassword } from '../../domain/value_objects/plinPassword.vo.ts';

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
	}): Promise<UUidVo> {
		try {
			const userEmail = new EmailVo(email);
			const userPasswrord = new PlainPassword(password);

			const existUserWithEmail = await this.userRepository.findByEmail({
				userEmail,
			});
			if (existUserWithEmail === null) throw new InvalidLoginException();

			const isPasswordValid = await existUserWithEmail.comparePassword({
				password: userPasswrord,
			});

			if (isPasswordValid === false) throw new InvalidLoginException();

			return existUserWithEmail.uuid;
		} catch (err) {
			if (err instanceof ValueObjectFormatException)
				throw new InvalidLoginException();
			throw err;
		}
	}
}
