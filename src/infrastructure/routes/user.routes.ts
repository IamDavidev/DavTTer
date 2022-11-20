import { router } from '@infrastructure/clients/router.ts';

import { registerUserController } from '@infrastructure/controllers/registerUser.controller.ts';
import { REGISTER_USER_ENDPOINT } from '@shared/constants/enpoitns.const.ts';

import { RouterContext } from '$oak/router.ts';

console.info(
	'🚀 ~>  file: user.routes.ts ~>  line 5 ~>  REGISTER_USER_ENDPOINT',
	REGISTER_USER_ENDPOINT
);

router
	.post('/api/user/register/', registerUserController)
	.get('/users/', ({ response }: RouterContext<'/users/'>) => {
		const users = ['user1', 'user2', 'user3'];
		response.body = users;
	});
