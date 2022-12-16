import { type PrismaClient, type Publication } from '@prisma/index.d.ts';
import { injectable } from '@shared/packages/npm/inversify.package.ts';

import PublicationModel from '@domain/models/publication.model.ts';

import { BodyVo } from '@domain/value_objects/Body.vo.ts';
import { IntVo } from '@domain/value_objects/int.vo.ts';
import { IntDateVo } from '@domain/value_objects/intData.vo.ts';
import { TitleVo } from '@domain/value_objects/title.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

import {
	FindPublicationByCriteria,
	IPublicationRepository,
} from '@infrastructure/interfaces/publicationRepository.interface.ts';

import { IImagePublication } from '@domain/interfaces/ImagePublication.interface.ts';
import { IPublicationEntity } from '@domain/interfaces/PublicationEntity.interface.ts';
import { prisma } from '@infrastructure/clients/prisma.client.ts';
import { EFormatImagePublication } from '../../domain/interfaces/FormatImagePUblication.enum.ts';

export type IOrmPublicationDB = Publication;

export interface publicationRegister {
	uuid: string;
	title: string;
	body: string;
	image: IImagePublication;
	createdAt: Date;
	updatedAt: Date;
	likes: number;
	likesByUsers: UUidVo[];
	userId: string;
}

enum format {
	png = 'png',
}

@injectable()
export class PublicationRepository implements IPublicationRepository {
	private _orm: PrismaClient;

	constructor() {
		this._orm = prisma;
	}

	public async existingUserUUId({
		userUUId,
	}: {
		userUUId: UUidVo;
	}): Promise<boolean> {
		const existingUserUUId = await this._orm.user.findUnique({
			where: {
				uuid: userUUId.value,
			},
		});
		console.info(
			'🚀 ~>  file: publicationRepository.ts:50 ~>  PublicationRepository ~>  existingUserId ~>  existingUserId',
			existingUserUUId
		);
		if (existingUserUUId !== null) return true;
		return false;
	}

	public async create({ publication }: { publication: PublicationModel }) {
		console.info(
			'🚀 ~>  file: publicationRepository.ts:58 ~>  PublicationRepository ~>  create ~>  publication',
			publication
		);
		const {
			body,
			createdAt,
			image,
			likes,
			likesByUsers,
			title,
			updatedAt,
			userUUId,
			uuid,
		} = publication;

		const saveLikesByUsers = likesByUsers.map(user => {
			return user.value;
		});

		await this._orm.publication.create({
			data: {
				body: body.value,
				image: image,
				title: title.value,
				likes: likes.value,
				userUUId: userUUId.value,
				uuid: uuid.value,
				format: format.png,
				createdAt: createdAt.value,
				updatedAt: updatedAt.value,
				likesByUsers: saveLikesByUsers,
			},
		});
	}

	protected adapterPublicationToDomain(
		ormPublication: IOrmPublicationDB
	): PublicationModel {
		const {
			body,
			uuid,
			image,
			likes,
			title,
			userUUId,
			likesByUsers,
			createdAt,
			updatedAt,
		} = ormPublication;

		const likesByUserToVo = likesByUsers.map(user => {
			return new UUidVo(user);
		});

		return new PublicationModel(
			new UUidVo(uuid),
			new TitleVo(title),
			new BodyVo(body),
			image,
			new IntDateVo(createdAt),
			new IntDateVo(updatedAt),
			new IntVo(likes),
			likesByUserToVo,
			EFormatImagePublication.png,
			new UUidVo(userUUId)
		);
	}

	protected adapterPublicationToOrm(
		domainPublication: IPublicationEntity
	): publicationRegister {
		const {
			body,
			uuid,
			image,
			likes,
			title,
			userUUId,
			createdAt,
			likesByUsers,
			updatedAt,
		} = domainPublication;
		return {
			body: body.value,
			createdAt: createdAt.value,
			image: image,
			likes: likes.value,
			title: title.value,
			uuid: uuid.value,
			likesByUsers: likesByUsers,
			updatedAt: updatedAt.value,
			userId: userUUId.value,
		};
	}

	public async findByUUId({
		publicationUUId,
	}: {
		publicationUUId: UUidVo;
	}): FindPublicationByCriteria {
		const publicationFound = await this._orm.publication.findUnique({
			where: {
				uuid: publicationUUId.value,
			},
		});
		if (publicationFound == null) return null;
		return this.adapterPublicationToDomain(publicationFound);
	}

	public async findByUserUUId({
		userUUId,
	}: {
		userUUId: UUidVo;
	}): Promise<PublicationModel[] | null> {
		// change id for userId when prisma is updated with (prisma generate --data-proxy)
		const publicationFound = await this._orm.publication.findMany({
			where: {
				userUUId: userUUId.value,
			},
		});

		if (publicationFound == null) return null;
		return publicationFound.map(publication => {
			return this.adapterPublicationToDomain(publication);
		});
	}
}
