import { validate as validateId } from 'https://deno.land/std@0.164.0/uuid/v4.ts';
import {
	genSalt,
	hash as hashPassword,
} from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import {
	regexValidateBio,
	regexValidateEmail,
	regexValidateName,
	regexValidateTagName,
} from '@domain/constants/regexValidate.const.ts';
import { InvalidBioFormatException } from '@domain/errors/invalidBioFormat.exception.ts';
import { InvalidEmailFormatException } from '@domain/errors/invalidEmailFormat.exception.ts';
import { InvalidIdFormatException } from '@domain/errors/invalidIdFormat.exception.ts';
import { InvalidNameFormatException } from '@domain/errors/invalidNameFormat.exception.ts';
import { InvalidTagNameException } from '@domain/errors/invalidTagName.exception.ts';

export const HAS_SALT_ROUNDS = genSalt(10);

export default class UserModel {
	/**
	 * @param uuid User unique identifier
	 * @param name Name of the user
	 * @param email email of the user
	 * @param password Hashed password of the user
	 * @param tagName Tag Unique identifier
	 * @param bio  User bio
	 * @param profileImage User profile image URL
	 * @param numberOfPublications Number of publications of the user
	 * @param publications Publications array
	 */

	constructor(
		public readonly uuid: string,
		public name: string,
		public email: string,
		public password: string,
		public tagName: string,
		public bio: string | null,
		public profileImage: string | null,
		public numberOfPublications: number,
		public publications: string[] | []
	) {}

	static validateUUid(uuid: string): boolean {
		if (!validateId(uuid)) return false;

		return true;
	}

	static validateEmail(email: string): boolean {
		if (!regexValidateEmail.test(email)) return false;

		return true;
	}

	static validateName(name: string): boolean {
		if (!regexValidateName.test(name)) return false;
		if (name.includes('  ')) return false;
		if (name.includes('--')) return false;

		const nameSplited = name.split(' ');

		for (const word in nameSplited) {
			if (word.startsWith('-')) return false;
			if (word.endsWith('-')) return false;
		}

		return true;
	}

	static validateTagName(tagName: string): boolean {
		if (!regexValidateTagName.test(tagName)) return false;
		return true;
	}

	static validateBio(bio: string): boolean {
		if (bio.length > 300) return false;
		if (bio.length < 10) return false;
		return true;
	}
	static validateProfileImage(): boolean {
		return true;
	}

	static async createUser(props: UserModel): Promise<UserModel> {
		if (!UserModel.validateUUid(props.uuid))
			throw new InvalidIdFormatException();

		if (!UserModel.validateEmail(props.email)) {
			console.log(props.email);
			throw new InvalidEmailFormatException();
		}

		if (!UserModel.validateName(props.name))
			throw new InvalidNameFormatException();

		if (!UserModel.validateTagName(props.tagName))
			throw new InvalidTagNameException();

		if (props.bio && !UserModel.validateBio(props?.bio))
			throw new InvalidBioFormatException();

		const HAS_SALT_ROUNDS = await genSalt(10);
		const hashedsPassword = await hashPassword(props.password, HAS_SALT_ROUNDS);

		return new UserModel(
			props.uuid,
			props.name,
			props.email,
			hashedsPassword,
			props.tagName,
			props.bio,
			props.profileImage,
			0,
			[]
		);
	}
}
