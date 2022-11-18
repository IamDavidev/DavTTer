import { prisma } from '@infrastructure/clients/prisma.client.ts';

import UserModel from '@domain/models/user.model.ts';
import { type PrismaClient, type User } from '@prisma/index.d.ts';
import { type FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';

// type FindUserModel = UserModel | null;

export default class UserRepository {
	private _orm: PrismaClient;

	constructor() {
		this._orm = prisma;
	}

	protected adapterUserToDomain(ormUser: User): UserModel {
		/**
		 
			constructor(
			public readonly id: string,
			public name: string,
			public email: string,
			public password: string,
			public tagName: string,
			public bio: string,
			public profileImage: string | null,
			public numberPublications: number,
			public publication: PublicationModel[] | []
			) {}

     	*/

		const {
			id,
			name,
			email,
			password,
			tagName,
			bio,
			profileImage,
			numberOfPublications,
		} = ormUser;

		return new UserModel(
			id,
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

	protected adapterToOrm(userDomain: UserModel): User {
		const {
			id,
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
			id,
			publications,
		};
	}

	public async findUserById({
		userId,
	}: {
		userId: string;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async createUser({ user }: { user: UserModel }): Promise<void> {
		const {
			id,
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
				id,
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
