import { type IPublicationEntity } from '@domain/interfaces/PublicationEntity.interface.ts';
import { type IPublicationToCreate } from '@application/interfacs/PublicationToCreate.interface.ts';

import { BodyVo } from '@domain/value_objects/Body.vo.ts';
import { IntVo } from '@domain/value_objects/int.vo.ts';
import { IntDateVo } from '@domain/value_objects/intData.vo.ts';
import { TitleVo } from '@domain/value_objects/title.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

export function publicationCreateAdapterToVOs({
	body,
	createdAt,
	image,
	likes,
	likesByUsers,
	title,
	updatedAt,
	userId,
	uuid,
}: IPublicationToCreate): IPublicationEntity {
	const likesByUsersToVo = likesByUsers.map(user => new UUidVo(user));
	return {
		body: new BodyVo(body),
		createdAt: new IntDateVo(createdAt),
		image,
		likes: new IntVo(likes),
		title: new TitleVo(title),
		updatedAt: new IntDateVo(updatedAt),
		userId: new UUidVo(userId),
		uuid: new UUidVo(uuid),
		likesByUsers: likesByUsersToVo,
	};
}
