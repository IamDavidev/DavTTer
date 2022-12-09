// import PublicationModel from '../../domain/models/publication.model.ts';
// import publicationModel, {
// 	IPublicationEntity,
// } from '@domain/models/publication.model.ts';
// import { TitleVo } from '@domain/value_objects/title.vo.ts';
// import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
// import {
// 	FindPublicationByCriteria,
// 	IPublicationRepository,
// } from '@infrastructure/interfaces/publicationRepository.interface.ts';
// import { type Publication } from '@prisma/index.d.ts';
// import { injectable } from '@shared/packages/npm/inversify.package.ts';
// import { BodyVo } from '../../domain/value_objects/Body.vo.ts';
// import { IntDateVo } from '../../domain/value_objects/intData.vo.ts';
// import { IntVo } from '../../domain/value_objects/int.vo.ts';

// export type IOrmPublicationDB = Publication;
// j;
// @injectable()
// export class PublicationRepository implements IPublicationRepository {
// 	protected adapterPublicationToDomain(
// 		ormPublication: IOrmPublicationDB
// 	): PublicationModel {
// 		const { body, id, image, likes, title, userId } = ormPublication;
// 		const likesByUser = [new UUidVo(UUidVo)];

// 		return new PublicationModel(
// 			new UUidVo(id),
// 			new TitleVo(title),
// 			new BodyVo(body),
// 			image,
// 			new IntDateVo(new Date()),
// 			new IntDateVo(new Date()),
// 			new IntVo(likes),
// 			likesByUser,
// 			new UUidVo(userId)
// 		);
// 	}

// 	findByTitle({
// 		publicationTitle,
// 	}: {
// 		publicationTitle: TitleVo;
// 	}): FindPublicationByCriteria {
// 		throw new Error('Method not implemented.');
// 	}
// 	findByUUId({
// 		publicationUUId,
// 	}: {
// 		publicationUUId: UUidVo;
// 	}): FindPublicationByCriteria {
// 		throw new Error('Method not implemented.');
// 	}
// 	findByUserUUId({ userUUId }: { userUUId: UUidVo }): publicationModel[] {
// 		throw new Error('Method not implemented.');
// 	}
// }
