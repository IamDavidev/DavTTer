import { type PrismaClient, type User } from '@prisma/index.d.ts';
import { prisma } from '@infrastructure/clients/prisma.client.ts';

import UserModel from '@domain/models/user.model.ts';

import { type FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';

import { UserRegister } from '@application/interfacs/UserRegister.interface.ts';
import { injectable } from '@shared/packages/npm/inversify.package.ts';

// type FindUserModel = UserModel | null;

@injectable()
export default class UserRepository implements IUserRepository {
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
			publications,
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
			publications
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

	public async create({ user }: { user: UserModel }): Promise<void> {
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

	public async findByTagName({
		userTagName,
	}: {
		userTagName: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				tagName: userTagName,
			},
		});

		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async findByUUId({
		userUUId,
	}: {
		userUUId: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				uuid: userUUId,
			},
		});
		console.log(userFound);
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async findByEmail({
		userEmail,
	}: {
		userEmail: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				email: userEmail,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}
}
