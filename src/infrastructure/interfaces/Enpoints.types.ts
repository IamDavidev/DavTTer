import {
	REGISTER_USER_ENDPOINT,
	LOGIN_USER_ENDPOINT,
	CREATE_PUBLICATION_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

export type RegisterUserRequest = typeof REGISTER_USER_ENDPOINT;
export type LoginUserRequest = typeof LOGIN_USER_ENDPOINT;

export type CreatePublicationRequest = typeof CREATE_PUBLICATION_ENDPOINT;
