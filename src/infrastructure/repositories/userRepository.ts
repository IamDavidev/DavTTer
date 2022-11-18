import { type PrismaClient, type User } from '@prisma/index.d.ts';

import UserModel from '@domain/models/user.model.ts';

type UserOrmPrisma = User | null;

export default class UserRepository {
	private _orm: PrismaClient;

	constructor(orm: PrismaClient) {
		this._orm = orm;
	}

	protected adapterUserToDomain(ormUser: User): UserModel {
		/**
     *
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
			numberPublications,
			password,
			profileImage,
			publications,
			tagName,
		} = userDomain;

		return {
			bio: bio ? bio : '',
			email,
			name,
			numberOfPublications: numberPublications,
			password,
			profileImage: profileImage ? profileImage : '',
			tagName,
			id,
			publications,
		};
	}

	public async findUserById(userId: string): Promise<UserModel | null> {
		const userFound = await this._orm.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}
	public async createUser(user: UserModel): Promise<void> {
		const {
			id,
			bio,
			email,
			name,
			numberPublications,
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
				numberOfPublications: numberPublications,
				password,
				profileImage: profileImage ? profileImage : '',
				tagName,
				id,
				publications,
			},
		});
	}
	public async findUserByTagName(tagName: string): Promise<void> {
		await this._orm.user.findUnique({
			where: {
				tagName,
			},
		});
	}
	public async findUserByEmail(email: string): Promise<void> {
		await this._orm.user.findUnique({
			where: {
				email,
			},
		});
	}
}
