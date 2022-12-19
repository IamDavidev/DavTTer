import { injectable } from '@shared/packages/npm/inversify.package.ts';
import { prisma } from '@infrastructure/clients/prisma.client.ts';
import { type PrismaClient, type User } from '@prisma/index.d.ts';

import UserModel from '@domain/models/user.model.ts';

import { type IUserEntity } from '@shared/interface/User.interface.ts';
import { type FindUserByCriteria } from '@infrastructure/interfaces/FindUserByCriteria.type.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';

import { type UserRegister } from '@application/interfacs/UserRegister.interface.ts';

import { BioVo } from '@domain/value_objects/bio.vo.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { NameVo } from '@domain/value_objects/name.vo.ts';
import { PasswordVo } from '@domain/value_objects/password.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
import { ValuesUpdated } from '../interfaces/valuesUpdated.interface.ts';

export type IOrmUserDB = User;

@injectable()
export default class UserRepository implements IUserRepository {
	private _orm: PrismaClient;

	constructor() {
		this._orm = prisma;
	}

	protected adapterUserToDomain(ormUser: IOrmUserDB): UserModel {
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

		const publicationVOs = publications.map(publicationUUId => {
			return new UUidVo(publicationUUId);
		});

		return new UserModel(
			new UUidVo(uuid),
			new NameVo(name),
			new EmailVo(email),
			new PasswordVo(password),
			new TagNameVo(tagName),
			new BioVo(bio || ''),
			profileImage,
			numberOfPublications,
			publicationVOs
		);
	}

	protected adapterToOrm(userDomain: IUserEntity): UserRegister {
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
			bio: bio ? bio.value : '',
			email: email.value,
			name: name.value,
			numberOfPublications,
			password: password.value,
			profileImage: profileImage ? profileImage : '',
			tagName: tagName.value,
			uuid: uuid.value,
			publications,
		};
	}

	// deno-lint-ignore require-await
	public async update({
		userUUId,
		valuesUpdated,
	}: {
		userUUId: UUidVo;
		valuesUpdated: ValuesUpdated;
	}): Promise<void> {
		console.info(
			'🚀 ~>  file: userRepository.ts:90 ~>  UserRepository ~>  userUUId',
			userUUId
		);
		console.info(
			'🚀 ~>  file: userRepository.ts:90 ~>  UserRepository ~>  valuesUpdated',
			valuesUpdated
		);
		// const newUser = await this._orm.user.update({
		// 	where: {
		// 		uuid: userUUId.value,
		// 	},
		// 	data: {
		// 		name: '',
		// 	},
		// });

		return Promise.resolve();
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
		const publicationsValues = publications.map(publication => {
			return publication.value;
		});

		await this._orm.user.create({
			data: {
				bio: bio ? bio.value : '',
				email: email.value,
				name: name.value,
				numberOfPublications,
				password: password.value,
				profileImage: profileImage ? profileImage : '',
				tagName: tagName.value,
				uuid: uuid.value,
				publications: publicationsValues,
			},
		});
	}

	public async findByTagName({
		userTagName,
	}: {
		userTagName: TagNameVo;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				tagName: userTagName.value,
			},
		});

		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async findByUUId({
		userUUId,
	}: {
		userUUId: UUidVo;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				uuid: userUUId.value,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}

	public async findByEmail({
		userEmail,
	}: {
		userEmail: EmailVo;
	}): FindUserByCriteria {
		const userFound = await this._orm.user.findUnique({
			where: {
				email: userEmail.value,
			},
		});
		if (!userFound) return null;

		return this.adapterUserToDomain(userFound);
	}
}
