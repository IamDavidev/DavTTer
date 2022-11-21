import { router } from '@infrastructure/clients/router.ts';

import { registerUserController } from '@infrastructure/controllers/user/registerUser.controller.ts';
import {
	LOGIN_USER_ENDPOINT,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

import { loginUserController } from '../controllers/user/loginUser.controller.ts';

console.info('');
console.info('Registering routes...');
console.info('🚀 REGISTER_USER_ENDPOINT ~~>', REGISTER_USER_ENDPOINT);
console.info('🚀 LOGIN_USER_ENDPOINT ~~>', LOGIN_USER_ENDPOINT);
console.log('🚀 USER_ENPOINT_TEST_SERVER ~~>', '/users');
console.info('');

router
	.post(REGISTER_USER_ENDPOINT, registerUserController)
	.post(LOGIN_USER_ENDPOINT, loginUserController)
	.get('/users', ctx => {
		ctx.response.body = 'users';
	});
