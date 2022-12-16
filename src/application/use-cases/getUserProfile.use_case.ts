import { injectable, inject } from '@shared/packages/npm/inversify.package.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import UserModel from '../../domain/models/user.model.ts';
import { UUidVo } from '../../domain/value_objects/uuid.vo.ts';
import { UserNotExistException } from '../errors/userNotExist.exception.ts';

@injectable()
export class GetUserProfileUseCase {
	constructor(
		@inject(repositoriesSymbols.userRepository)
		private userRepository: IUserRepository
	) {}

	async execute({ userUUId }: { userUUId: UUidVo }): Promise<UserModel> {
		const userDB = await this.userRepository.findByUUId({
			userUUId,
		});

		if (userDB === null) throw new UserNotExistException();

		return userDB;
	}
}
