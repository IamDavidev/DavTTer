import { router } from '@infrastructure/clients/router.ts';

import { registerUserController } from '@infrastructure/controllers/user/registerUser.controller.ts';
import {
	LOGIN_USER_ENDPOINT,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

import { loginUserController } from '../controllers/user/loginUser.controller.ts';

console.info(
	'🚀 ~>  file: user.routes.ts ~>  line 5 ~>  REGISTER_USER_ENDPOINT',
	REGISTER_USER_ENDPOINT
);

router
	.post(REGISTER_USER_ENDPOINT, registerUserController)
	.post(LOGIN_USER_ENDPOINT, loginUserController)
	.get('/users', ctx => {
		ctx.response.body = 'users';
	});
