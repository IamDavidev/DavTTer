import PublicationModel from '@domain/models/publication.model.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';
import { TitleVo } from '@domain/value_objects/title.vo.ts';

export type FindPublicationByCriteria = Promise<PublicationModel | null>;

export interface IPublicationRepository {
	findByUUId({
		publicationUUId,
	}: {
		publicationUUId: UUidVo;
	}): FindPublicationByCriteria;

	findByTitle({
		publicationTitle,
	}: {
		publicationTitle: TitleVo;
	}): FindPublicationByCriteria;

	findByUserUUId({ userUUId }: { userUUId: UUidVo }): PublicationModel[];

	// maybe add if param includues in body or title [optional]
}
