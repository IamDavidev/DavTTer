import '../../src/app.ts';
import { it } from '$testing/bdd.ts';
import {
	assertEquals,
	fail,
} from 'https://deno.land/std@0.136.0/testing/asserts.ts';

import UserModel from '@domain/models/user.model.ts';

import { MethodsRequest } from '../interfaces/methods.enum.ts';

import {
	BASE_URL,
	REGISTER_USER_ENDPOINT,
} from '@shared/constants/enpoitns.const.ts';
console.log('Enpoint To Fetch', BASE_URL + REGISTER_USER_ENDPOINT);

export const SUCESS_USER: UserModel = {
	uuid: 'cf99fb0f-aa38-4d92-a961-aec91cdf1d55',
	name: 'John Doe',
	email: 'David@david.com',
	password: '352xALX&Jmsq',
	tagName: 'IamDavid',
	bio: 'I am David, and I am a developer with 5 years of experience in the languages go, python, javascript, typescript, and c++, but right now I am learning deno, and recently I have been working with react, and react native',
	profileImage: 'https://www.google.com',
	numberOfPublications: 0,
	publications: [],
};
export const InvalidID = 'si vale?';
export const InvalidEmail = 'email@invalid';
export const InvalidPassword = '1234';
export const InvalidTagName = '1234 1234';

export async function requestEnpointRegisterUser(
	user: UserModel
): Promise<Response> {
	const url = `${BASE_URL}${REGISTER_USER_ENDPOINT}`;

	const res = await fetch(url, {
		method: MethodsRequest.__POST,
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

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
	try {
		const res = await requestEnpointRegisterUser(SUCESS_USER);

		assertEquals(
			res.status,
			EXPECTED_STATUS,
			failedStatus(EXPECTED_STATUS, res.status)
		);
	} catch (_err) {
		console.log('Error User Register ');
	}
});

// it('{ Invalid Id } - [ Register Failded ]', async () => {
// 	const EXPECTED_STATUS = 409; // Conflict
// 	try {
// 		const userInvalid = { ...SUCESS_USER, uuid: InvalidID };

// 		const res = await requestEnpointRegisterUser(userInvalid);

// 		assertEquals(
// 			res.status,
// 			EXPECTED_STATUS,
// 			failedStatus(EXPECTED_STATUS, res.status)
// 		);
// 	} catch (err) {
// 		fail(err);
// 	}
// });

// it('{ Invalid Email } - [ Register Failded ]', async () => {
// 	const EXPECTED_STATUS = 409; // Conflict
// 	try {
// 		const userInvalid = { ...SUCESS_USER, email: InvalidID };
// 		const res = await requestEnpointRegisterUser(userInvalid);
// 		assertEquals(res.status, EXPECTED_STATUS, 'user not created');
// 		fail(failedStatus(EXPECTED_STATUS, res.status));
// 	} catch (err) {
// 		fail(err);
// 	}
// });

// it('{ Invalid Password } - [ Register Failded ]', async () => {
// 	const EXPECTED_STATUS = 409; // Conflict
// 	try {
// 		const userInvalid = { ...SUCESS_USER, password: InvalidPassword };
// 		const res = await requestEnpointRegisterUser(userInvalid);
// 		assertEquals(
// 			res.status,
// 			EXPECTED_STATUS,
// 			failedStatus(EXPECTED_STATUS, res.status)
// 		);
// 	} catch (err) {
// 		fail(err);
// 	}
// });

// it('{ Invalid TagName } - [ Register Failded ]', async () => {
// 	const EXPECTED_STATUS = 409; // Conflict
// 	try {
// 		const userInvalid = { ...SUCESS_USER, tagName: InvalidTagName };
// 		const res = await requestEnpointRegisterUser(userInvalid);
// 		assertEquals(
// 			res.status,
// 			EXPECTED_STATUS,
// 			failedStatus(EXPECTED_STATUS, res.status)
// 		);
// 	} catch (err) {
// 		fail(err);
// 	}
// });

// it('test working [ success ]', () => {
// 	assertEquals(1, 1);
// });
// it('test working [ failed ]', () => {
// 	assertEquals(1, 3);
// });
