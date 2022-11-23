import { Container } from '@shared/packages/npm/inversify.package.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import UserRepository from '@infrastructure/repositories/userRepository.ts';

const container = new Container();

container
	.bind<IUserRepository>(repositoriesSymbols.userRepository)
	.to(UserRepository);
