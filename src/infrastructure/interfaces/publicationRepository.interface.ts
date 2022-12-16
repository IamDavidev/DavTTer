import PublicationModel from '@domain/models/publication.model.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

export type FindPublicationByCriteria = Promise<PublicationModel | null>;

export interface IPublicationRepository {
	findByUUId({
		publicationUUId,
	}: {
		publicationUUId: UUidVo;
	}): FindPublicationByCriteria;

	// findByTitle({
	// 	publicationTitle,
	// }: {
	// 	publicationTitle: TitleVo;
	// }): FindPublicationByCriteria;

	findByUserUUId({
		userUUId,
	}: {
		userUUId: UUidVo;
	}): Promise<PublicationModel[] | null>;

	create({ publication }: { publication: PublicationModel }): Promise<void>;

	existingUserUUId({ userUUId }: { userUUId: UUidVo }): Promise<boolean>;

	// maybe add if param includues in body or title [optional]
}
