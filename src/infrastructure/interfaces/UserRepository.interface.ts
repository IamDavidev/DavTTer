import UserModel from '@domain/models/user.model.ts';
import { FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';

export interface IUserRepository {
	/**
	 * Find a user by criteria (UserUUId)
	 * @param userUUId id of the user
	 * @returns UserModel
	 */
	findByUUId({ userUUId }: { userUUId: string }): FindUserByCriteria;

	/**
	 * Find a user by criteria (tagName)
	 * @param userTagName tag name of the user
	 * @returns UserModel
	 */
	findByTagName({ userTagName }: { userTagName: string }): FindUserByCriteria;

	/**
	 * Find a user by criteria (email)
	 * @param email email of the user
	 * @returns UserModel
	 */
	findByEmail({ userEmail }: { userEmail: string }): FindUserByCriteria;

	/**
	 * Create a new user
	 * @param user UserModel
	 * @returns void
	 */
	create({ user }: { user: UserModel }): Promise<void>;
}
