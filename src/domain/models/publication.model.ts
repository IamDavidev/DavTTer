import { type IPublicationEntity } from '@domain/interfaces/PublicationEntity.interface.ts';
import { type IImagePublication } from '@domain/interfaces/ImagePublication.interface.ts';

import { BodyVo } from '@domain/value_objects/Body.vo.ts';
import { IntVo } from '@domain/value_objects/int.vo.ts';
import { IntDateVo } from '@domain/value_objects/intData.vo.ts';
import { TitleVo } from '@domain/value_objects/title.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

export default class PublicationModel {
	/**
	 * @param uuid Publication unique identifier
	 * @param title Title of the publication
	 * @param body  Description of the publication
	 * @param image Publication image URL
	 * @param likes Number of likes of the publication
	 * @param userId User unique identifier
	 * @param createdAt Date of creation of the publication
	 * @param updatedAt Date of update of the publication
	 * @param likesByUsers Array of users who liked the publication
	 *
	 */
	constructor(
		public readonly uuid: UUidVo,
		public title: TitleVo,
		public body: BodyVo,
		public image: IImagePublication,
		public createdAt: IntDateVo,
		public updatedAt: IntDateVo,
		public likes: IntVo,
		public likesByUsers: UUidVo[],
		public userId: UUidVo
	) {}

	static create(props: IPublicationEntity): PublicationModel {
		return new PublicationModel(
			props.uuid,
			props.title,
			props.body,
			props.image,
			props.createdAt,
			props.updatedAt,
			props.likes,
			props.likesByUsers,
			props.userId
		);
	}
}
