import { type IImagePublication } from '@domain/interfaces/ImagePublication.interface.ts';

import { BodyVo } from '@domain/value_objects/Body.vo.ts';
import { IntVo } from '@domain/value_objects/int.vo.ts';
import { IntDateVo } from '@domain/value_objects/intData.vo.ts';
import { TitleVo } from '@domain/value_objects/title.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
import { EFormatImagePublication } from './FormatImagePUblication.enum.ts';

export interface IPublicationEntity {
	uuid: UUidVo; // Unique identifier of the publication
	title: TitleVo; // title of the publication
	body: BodyVo; // description of the publication
	image: IImagePublication; // url of image
	createdAt: IntDateVo; // create publication
	updatedAt: IntDateVo; // update publication
	likes: IntVo; // number of likes
	format: EFormatImagePublication; // format of image
	likesByUsers: UUidVo[]; // users who liked the publication
	userUUId: UUidVo;
}
