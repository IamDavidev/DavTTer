import { prisma } from '@infrastructure/clients/prisma.client.ts';

import UserModel from '@domain/models/user.model.ts';
import { type PrismaClient, type User } from '@prisma/index.d.ts';
import { type FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';
import { UserRegister } from '../../application/use-cases/registerUser.use_case.ts';

// type FindUserModel = UserModel | null;

export default class UserRepository {
	private _orm: PrismaClient;

	constructor() {
		this._orm = prisma;
	}

	protected adapterUserToDomain(ormUser: User): UserModel {
		const {
			uuid,
			name,
			email,
			password,
			tagName,
			bio,
			profileImage,
			numberOfPublications,
		} = ormUser;

		return new UserModel(
			uuid,
			name,
			email,
			password,
			tagName,
			bio,
			profileImage,
			numberOfPublications,
			[]
		);
	}

	protected adapterToOrm(userDomain: UserModel): UserRegister {
		const {
			uuid,
			bio,
			email,
			name,
			numberOfPublications,
			password,
			profileImage,
			publications,
			tagName,
		} = userDomain;

		return {
			bio: bio ? bio : '',
			email,
			name,
			numberOfPublications,
			password,
			profileImage: profileImage ? profileImage : '',
			tagName,
			uuid,
			publications,
		};
	}

	public async findUserByUUId({
		userUUId,
	}: {
		userUUId: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				uuid: userUUId,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async createUser({ user }: { user: UserModel }): Promise<void> {
		const {
			uuid,
			bio,
			email,
			name,
			numberOfPublications,
			password,
			profileImage,
			publications,
			tagName,
		} = user;

		await this._orm.user.create({
			data: {
				bio: bio ? bio : '',
				email,
				name,
				numberOfPublications,
				password,
				profileImage: profileImage ? profileImage : '',
				tagName,
				uuid,
				publications,
			},
		});
	}

	public async findUserByTagName({
		tagName,
	}: {
		tagName: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				tagName,
			},
		});

		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async findUserByEmail({
		email,
	}: {
		email: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				email,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}
}
