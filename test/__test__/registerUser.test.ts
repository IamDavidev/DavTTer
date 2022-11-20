import { it } from '$testing/bdd.ts';
import {
	assertEquals,
	fail,
} from 'https://deno.land/std@0.136.0/testing/asserts.ts';

import { MethodsRequest } from '../interfaces/methods.enum.ts';

import {
	BASE_URL,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';

export interface UserToRegister {
	uuid: string;
	bio: string;
	email: string;
	name: string;
	password: string;
	profileImage: string | null;
	tagName: string;
}

export const SUCESS_USER: UserToRegister = {
	uuid: 'cf99fb0f-aa38-4d92-a961-aec91cdf1d55',
	name: 'John Doe',
	email: 'David@david.com',
	password: '352xALX&Jmsq',
	tagName: 'IamDavid',
	bio: 'I am David, and I am a developer with 5 years of experience in the languages go, python, javascript, typescript, and c++, but right now I am learning deno, and recently I have been working with react, and react native',
	profileImage: 'https://www.google.com',
};
export const InvalidID = 'si vale?';
export const InvalidEmail = 'email@invalid';
export const InvalidPassword = '1234';
export const InvalidTagName = '1234 1234';

export async function requestEnpointRegisterUser(
	user: UserToRegister,
	abortController: AbortController
): Promise<Response> {
	const url = `${BASE_URL}${REGISTER_USER_ENDPOINT}`;

	const res = await fetch(url, {
		method: MethodsRequest.__POST,
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
		signal: abortController.signal,
	});
	await res.text();
	return res;
}
export function failedStatus(
	statusExpected: number,
	statusRequest: number
): string {
	return `Expected status code: ${statusExpected},but received:${statusRequest} `;
}

it('[Register-Succesfully] Should be create a user in bd', async () => {
	const EXPECTED_STATUS = 201; // Created
	const abortController = new AbortController();
	try {
		const res = await requestEnpointRegisterUser(SUCESS_USER, abortController);
		assertEquals(
			res.status,
			EXPECTED_STATUS,
			failedStatus(EXPECTED_STATUS, res.status)
		);
	} catch (err) {
		abortController.abort();
		fail(failedStatus(EXPECTED_STATUS, err.code));
	}
});

it('{ Invalid Id } - [ Register Failded ]', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for invalid id
	try {
		const userInvalidId = { ...SUCESS_USER, uuid: InvalidID };

		const res = await requestEnpointRegisterUser(
			userInvalidId,
			abortController
		);

		assertEquals(
			res.status,
			EXPECTED_STATUS,
			failedStatus(EXPECTED_STATUS, res.status)
		);
	} catch (err) {
		abortController.abort();
		fail(failedStatus(EXPECTED_STATUS, err.code));
	}
});

it('{ Invalid Email } - [ Register Failded ]', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for invalid email
	try {
		const userInvalidEmail = { ...SUCESS_USER, email: InvalidID };

		const res = await requestEnpointRegisterUser(
			userInvalidEmail,
			abortController
		);

		assertEquals(res.status, EXPECTED_STATUS, 'user not created');
	} catch (err) {
		abortController.abort();
		fail(failedStatus(EXPECTED_STATUS, err.code));
	}
});

it('{ Invalid TagName } - [ Register Failded ]', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for invalid tagName
	try {
		const userInvalidTagName = { ...SUCESS_USER, tagName: InvalidTagName };
		const res = await requestEnpointRegisterUser(
			userInvalidTagName,
			abortController
		);
		assertEquals(
			res.status,
			EXPECTED_STATUS,
			failedStatus(EXPECTED_STATUS, res.status)
		);
	} catch (err) {
		abortController.abort();
		fail(err);
	}
});
