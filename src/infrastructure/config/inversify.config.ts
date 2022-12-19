import { Container } from '@shared/packages/npm/inversify.package.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import UserRepository from '@infrastructure/repositories/userRepository.ts';
import { IPublicationRepository } from '@infrastructure/interfaces/publicationRepository.interface.ts';
import { PublicationRepository } from '@infrastructure/repositories/publicationRepository.ts';

import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { LoginUserUseCase } from '@application/use-cases/loginUser.use_case.ts';
import { LoginUserController } from '@infrastructure/controllers/user/loginUser.controller.ts';

import { RegisterUserUseCase } from '@application/use-cases/registerUser.use_case.ts';
import { RegisterUserController } from '@infrastructure/controllers/user/registerUser.controller.ts';

import { controllersSymbols } from '@infrastructure/interfaces/controllers.symbol.ts';
import { CreatePublicationUseCase } from '@application/use-cases/publicationCreate.use_case.ts';
import { CreatePublicationController } from '@infrastructure/controllers/publication/createPublication.controller.ts';
import { GetUserProfileUseCase } from '@application/use-cases/getUserProfile.use_case.ts';
import { GetUserProfileController } from '@infrastructure/controllers/user/getUserProfile.controller.ts';
import { UpdateUserUseCase } from '../../application/use-cases/updateUser.use_case.ts';

const container = new Container();

//#region User

// repositories
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
container
	.bind<GetUserProfileUseCase>(useCasesSymbols.getUserProfileUseCase)
	.to(GetUserProfileUseCase);
container
	.bind<UpdateUserUseCase>(useCasesSymbols.updatedUser)
	.to(UpdateUserUseCase);

// controllers
container
	.bind<LoginUserController>(controllersSymbols.loginUserController)
	.to(LoginUserController);
container
	.bind<RegisterUserController>(controllersSymbols.registerUserController)
	.to(RegisterUserController);
container
	.bind<GetUserProfileController>(controllersSymbols.getUserProfileController)
	.to(GetUserProfileController);

//#endregion

//#region  Publication

// repositories
container
	.bind<IPublicationRepository>(repositoriesSymbols.publicationRepository)
	.to(PublicationRepository);

// use cases
container
	.bind<CreatePublicationUseCase>(useCasesSymbols.createPublicationUseCase)
	.to(CreatePublicationUseCase);

// controllers
container
	.bind<CreatePublicationController>(
		controllersSymbols.createPublicationController
	)
	.to(CreatePublicationController);

//#endregion

export default container;
