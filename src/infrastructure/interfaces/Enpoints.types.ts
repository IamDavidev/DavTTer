import {
	REGISTER_USER_ENDPOINT,
	LOGIN_USER_ENDPOINT,
	CREATE_PUBLICATION_ENDPOINT,
	GET_USER_PROFILE_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

export type RouteRegisterUser = typeof REGISTER_USER_ENDPOINT;
export type RouteLoginUser = typeof LOGIN_USER_ENDPOINT;
export type RouteGetUserProfile = typeof GET_USER_PROFILE_ENDPOINT;
export type RouteCreatePublication = typeof CREATE_PUBLICATION_ENDPOINT;
