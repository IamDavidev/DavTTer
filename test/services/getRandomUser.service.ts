import { faker } from 'https://deno.land/x/deno_faker@v1.0.3/mod.ts';

import { UserToRegister } from '../interfaces/UserToRegister.interface.ts';
import { getRandomUUId } from './getRandomUUId.service.ts';
import { getRandomEmail } from './getRandomEmail.service.ts';

export function getRandomUser(): UserToRegister {
	return {
		uuid: getRandomUUId(),
		email: getRandomEmail(),
		password: faker.internet.password(),
		bio: faker.lorem.sentence() + faker.lorem.sentence(),
		name: faker.name.firstName(),
		profileImage: faker.image.avatar(),
		tagName: faker.internet.userName(),
	};
}

console.log(getRandomUser());
