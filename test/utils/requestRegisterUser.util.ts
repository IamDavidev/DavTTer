import {
	BASE_URL,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';
import { MethodsRequest } from '../interfaces/MethodsRequest.enum.ts';
import { UserToRegister } from '../interfaces/UserToRegister.interface.ts';

export async function requestEnpointRegisterUser(
	user: UserToRegister | any,
	abortController: AbortController
): Promise<Response> {
	const url = `${BASE_URL}${REGISTER_USER_ENDPOINT}`;

	const res = await fetch(url, {
		method: MethodsRequest.__POST__,
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
		signal: abortController.signal,
	});

	await res.text();

	return res;
}
