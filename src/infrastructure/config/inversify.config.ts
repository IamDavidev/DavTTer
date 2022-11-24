import { Container } from '@shared/packages/npm/inversify.package.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import UserRepository from '@infrastructure/repositories/userRepository.ts';

import { LoginUserUseCase } from '@application/use-cases/loginUser.use_case.ts';
import { LoginUserController } from '@infrastructure/controllers/user/loginUser.controller.ts';

import { RegisterUserUseCase } from '@application/use-cases/registerUser.use_case.ts';
import { RegisterUserController } from '@infrastructure/controllers/user/registerUser.controller.ts';

import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { controllersSymbols } from '@infrastructure/interfaces/controllers.symbol.ts';

const container = new Container();

container
	.bind<IUserRepository>(repositoriesSymbols.userRepository)
	.to(UserRepository);

// use cases

container
	.bind<LoginUserUseCase>(useCasesSymbols.loginUserUseCase)
	.to(LoginUserUseCase);

container
	.bind<RegisterUserUseCase>(useCasesSymbols.registerUserUseCase)
	.to(RegisterUserUseCase);

// controllers
container
	.bind<LoginUserController>(controllersSymbols.loginUserController)
	.to(LoginUserController);

container
	.bind<RegisterUserController>(controllersSymbols.registerUserController)
	.to(RegisterUserController);

export default container;
