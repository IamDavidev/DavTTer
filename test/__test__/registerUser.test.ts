// import { it } from '$testing/bdd.ts';
import { it } from 'https://deno.land/std@0.170.0/testing/bdd.ts';
import { assertEquals, fail } from '$testing/testing/asserts.ts';

import {
	InvalidID,
	InvalidTagName,
	SUCESS_USER,
} from '../constants/fake_user_register.conts.ts';

import { getRandomEmail } from '../services/getRandomEmail.service.ts';
import { getRandomUUId } from '../services/getRandomUUId.service.ts';
import { getRandomUser } from '../services/getRandomUser.service.ts';

import { failedStatus } from '../utils/failedStatus.util.ts';
import { requestEnpointRegisterUser } from '../utils/requestRegisterUser.util.ts';

it('[Register-Succesfully] Should be create a user in bd', async () => {
	const EXPECTED_STATUS = 201; // Created
	const abortController = new AbortController();
	try {
		const res = await requestEnpointRegisterUser(
			getRandomUser(),
			abortController
		);
		assertEquals(res.status, EXPECTED_STATUS);
	} catch (err) {
		abortController.abort();
		fail(failedStatus(err.status, EXPECTED_STATUS));
	}
});

it('Duplicate UUId', async () => {
	const abortController: AbortController = new AbortController();
	const EXPECTED_STATUS = 409; // Conflict
	try {
		const userDupiclateUUId = {
			...SUCESS_USER,
			uuid: getRandomUUId(),
		};
		const resonse = await requestEnpointRegisterUser(
			userDupiclateUUId,
			abortController
		);
		assertEquals(resonse.status, EXPECTED_STATUS);
	} catch (err) {
		abortController.abort();
		assertEquals(err.status, EXPECTED_STATUS);
	}
});

it('Invalid UUId ', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for invalid id
	try {
		const userInvalidUUId = { ...SUCESS_USER, uuid: InvalidID };

		const res = await requestEnpointRegisterUser(
			userInvalidUUId,
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

it('Duplicate Email', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 409; // Conflict
	try {
		const userDuplicateEmail = {
			...SUCESS_USER,
			uuid: getRandomUUId(),
		};
		const res = await requestEnpointRegisterUser(
			userDuplicateEmail,
			abortController
		);
		assertEquals(res.status, EXPECTED_STATUS);
	} catch (err) {
		abortController.abort();
		assertEquals(err.status, EXPECTED_STATUS);
	}
});

it('Invalid Email', async () => {
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

it('Duplicate TagName', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 409; // Conflict
	try {
		const userDuplicateTagName = {
			...SUCESS_USER,
			uuid: getRandomUUId(),
			email: getRandomEmail(),
		};

		const resonse = await requestEnpointRegisterUser(
			userDuplicateTagName,
			abortController
		);

		assertEquals(resonse.status, EXPECTED_STATUS);
	} catch (err) {
		abortController.abort();
		assertEquals(err.status, EXPECTED_STATUS);
	}
});

it('Invalid TagName', async () => {
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

/*
	* this test is not working with typescript because the typescript compiler is not allowing to send a object with missing fields


it('Missign fields', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for invalid tagName
	try {
		const userMissingFields = {
			uuid: getRandomUUId(),
			email: getRandomEmail(),
			name: 'test',
		};
		const response = await requestEnpointRegisterUser(
			userMissingFields,
			abortController
		);
		assertEquals(response.status, EXPECTED_STATUS);
	} catch (err) {
		abortController.abort();
		assertEquals(err.status, EXPECTED_STATUS);
	}
});
*/

it('Unnecesary fields', async () => {
	const abortController = new AbortController();
	const EXPECTED_STATUS = 400; // Bad Request for Unnecesary fields
	try {
		const userWithUnnecesaryFields = {
			...SUCESS_USER,
			uuid: getRandomUUId(),
			tagName: 'tfasfdasdfadafdest',
			email: getRandomEmail(),
			a: 'test',
			b: 'test',
		};

		const response = await requestEnpointRegisterUser(
			userWithUnnecesaryFields,
			abortController
		);

		assertEquals(EXPECTED_STATUS, response.status);
	} catch (err) {
		abortController.abort();
		assertEquals(err.status, EXPECTED_STATUS);
	}
});
