import UserModel from '@domain/models/user.model.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

import { type FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';
import { ValuesUpdated } from '@infrastructure/interfaces/valuesUpdated.interface.ts';

export interface IUserRepository {
	/**
	 * Find a user by criteria (UserUUId)
	 * @param userUUId id of the user
	 * @returns UserModel
	 */
	findByUUId({ userUUId }: { userUUId: UUidVo }): FindUserByCriteria;

	/**
	 * Find a user by criteria (tagName)
	 * @param userTagName tag name of the user
	 * @returns UserModel
	 */
	findByTagName({
		userTagName,
	}: {
		userTagName: TagNameVo;
	}): FindUserByCriteria;

	/**
	 * Find a user by criteria (email)
	 * @param email email of the user
	 * @returns UserModel
	 */
	findByEmail({ userEmail }: { userEmail: EmailVo }): FindUserByCriteria;

	/**
	 * Create a new user
	 * @param user UserModel
	 * @returns void
	 */
	create({ user }: { user: UserModel }): Promise<void>;

	update({
		userUUId,
		valuesUpdated,
	}: {
		userUUId: UUidVo;
		valuesUpdated: ValuesUpdated;
	}): Promise<void>;
}
