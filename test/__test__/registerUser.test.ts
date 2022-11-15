import { beforeAll, describe, it } from '$testing/bdd.ts';
import {
  assertEquals,
  fail,
} from 'https://deno.land/std@0.136.0/testing/asserts.ts';

import UserModel from '@domain/models/user.model.ts';
// import {
//   BASE_URL,
//   REGISTER_USER_ENDPOINT,
// } from '@shared/constants/enpoitns.const.ts';

import { MethodsRequest } from '../interfaces/methods.enum.ts';

export const SUCESS_USER: UserModel = {
  id: '627fe846de8030ff5224c84a',
  name: 'John Doe',
  email: 'David@david.com',
  password: '352xALX&Jmsq',
  tagName: 'IamDavid',
  bio: 'I am David',
  profileImage: 'https://www.google.com',
  numberPublications: 0,
  publication: [],
};
export const InvalidID = 'si vale?';
export const InvalidEmail = 'email@invalid';
export const InvalidPassword = '1234';
export const InvalidTagName = '1234 1234';

export async function requestEnpointRegisterUser(
  user: UserModel
): Promise<Response> {
  // const url = `${BASE_URL}${REGISTER_USER_ENDPOINT}`;
  const url = 'https://www.google.com';
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
    assertEquals(res.status, EXPECTED_STATUS, 'user not created');
    fail(
      // `Expected status code: ${EXPECTED_STATUS},but received:${res.status} `
      failedStatus(EXPECTED_STATUS, res.status)
    );
  } catch (err) {
    console.log('Error User Register: ', err);
    fail(err);
  }
});

it('{ Invalid Id } - [ Register Failded ]', async () => {
  const EXPECTED_STATUS = 409; // Conflict
  try {
    const userInvalid = { ...SUCESS_USER, id: InvalidID };
    const res = await requestEnpointRegisterUser(userInvalid);
    assertEquals(res.status, EXPECTED_STATUS, 'user not created');
    fail(failedStatus(EXPECTED_STATUS, res.status));
  } catch (err) {
    fail(err);
  }
});

it('{ Invalid Email } - [ Register Failded ]', async () => {
  const EXPECTED_STATUS = 409; // Conflict
  try {
    const userInvalid = { ...SUCESS_USER, email: InvalidID };
    const res = await requestEnpointRegisterUser(userInvalid);
    assertEquals(res.status, EXPECTED_STATUS, 'user not created');
    fail(failedStatus(EXPECTED_STATUS, res.status));
  } catch (err) {
    fail(err);
  }
});

it('{ Invalid Password } - [ Register Failded ]', async () => {
  const EXPECTED_STATUS = 409; // Conflict
  try {
    const userInvalid = { ...SUCESS_USER, password: InvalidPassword };
    const res = await requestEnpointRegisterUser(userInvalid);
    assertEquals(res.status, EXPECTED_STATUS, 'user not created');
    fail(failedStatus(EXPECTED_STATUS, res.status));
  } catch (err) {
    fail(err);
  }
});

it('{ Invalid TagName } - [ Register Failded ]', async () => {
  const EXPECTED_STATUS = 409; // Conflict
  try {
    const userInvalid = { ...SUCESS_USER, tagName: InvalidTagName };
    const res = await requestEnpointRegisterUser(userInvalid);
    assertEquals(res.status, EXPECTED_STATUS, 'user not created');
    fail(failedStatus(EXPECTED_STATUS, res.status));
  } catch (err) {
    fail(err);
  }
});

it('test working [ success ]', () => {
  assertEquals(1, 1);
});
it('test working [ failed ]', () => {
  assertEquals(1, 3);
});
