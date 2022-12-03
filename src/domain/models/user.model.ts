import { genSalt } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import { IUserEntity } from '@shared/interface/User.interface.ts';

import { NameVo } from '@domain/value_objects/name.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { PasswordVo } from '@domain/value_objects/password.vo.ts';
import { BioVo } from '@domain/value_objects/bio.vo.ts';
import { PlainPassword } from '@domain/value_objects/plinPassword.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';

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
		public readonly uuid: UUidVo,
		public name: NameVo,
		public email: EmailVo,
		public password: PasswordVo,
		public tagName: TagNameVo,
		public bio: BioVo,
		public profileImage: string | null,
		public numberOfPublications: number,
		public publications: string[] | []
	) {}

	public static create(user: IUserEntity): UserModel {
		return new UserModel(
			user.uuid,
			user.name,
			user.email,
			user.password,
			user.tagName,
			user.bio,
			user.profileImage,
			user.numberOfPublications,
			user.publications
		);
	}

	comparePassword({ password }: { password: PlainPassword }): Promise<boolean> {
		return this.password.compare(password);
	}
}
