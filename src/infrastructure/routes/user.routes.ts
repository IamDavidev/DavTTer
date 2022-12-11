import { router } from '@infrastructure/clients/router.ts';

import {
	LOGIN_USER_ENDPOINT,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

import container from '@infrastructure/config/inversify.config.ts';

import { LoginUserController } from '@infrastructure/controllers/user/loginUser.controller.ts';
import { controllersSymbols } from '@infrastructure/interfaces/controllers.symbol.ts';
import { RegisterUserController } from '@infrastructure/controllers/user/registerUser.controller.ts';

console.info('');
console.info('Registering routes...');
console.info('🚀 REGISTER_USER_ENDPOINT ~~>', REGISTER_USER_ENDPOINT);
console.info('🚀 LOGIN_USER_ENDPOINT ~~>', LOGIN_USER_ENDPOINT);
console.log('🚀 USER_ENPOINT_TEST_SERVER ~~>', '/users');
console.info('');

const loginUserController = container.get<LoginUserController>(
	controllersSymbols.loginUserController
);

const registerUserController = container.get<RegisterUserController>(
	controllersSymbols.registerUserController
);

router
	.post(
		REGISTER_USER_ENDPOINT,
		registerUserController.execute.bind(registerUserController)
	)
	.post(
		LOGIN_USER_ENDPOINT,
		loginUserController.execute.bind(loginUserController)
	)
	.get('/users', ctx => {
		ctx.response.body = 'users';
	});
