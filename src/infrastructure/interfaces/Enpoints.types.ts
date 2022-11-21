import {
	REGISTER_USER_ENDPOINT,
	LOGIN_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

export type RegisterUserRequest = typeof REGISTER_USER_ENDPOINT;
export type LoginUserRequest = typeof LOGIN_USER_ENDPOINT;
