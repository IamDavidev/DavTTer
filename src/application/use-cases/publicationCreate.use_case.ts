import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import PublicationModel from '@domain/models/publication.model.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

import { publicationCreateAdapterToVOs } from '@application/adapters/publiactionModel.adapter.ts';
import { IPublicationToCreate } from '@application/interfacs/PublicationToCreate.interface.ts';
import { PublicationIdAlreadyExistException } from '@application/errors/publicationIdAlreadyExist.exception.ts';

import { type IPublicationRepository } from '@infrastructure/interfaces/publicationRepository.interface.ts';
import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { TitleVo } from '../../domain/value_objects/title.vo.ts';
import { BodyVo } from '../../domain/value_objects/Body.vo.ts';

@injectable()
export class CreatePublicationUseCase {
	constructor(
		@inject(repositoriesSymbols.publicationRepository)
		private publicationRepository: IPublicationRepository
	) {}

	public async execute(props: IPublicationToCreate): Promise<void> {
		const newCreatePublication = PublicationModel.create(
			publicationCreateAdapterToVOs(props)
		);

		const existPublicationByUUId = await this.publicationRepository.findByUUId({
			publicationUUId: newCreatePublication.uuid,
		});
		if (existPublicationByUUId) throw new PublicationIdAlreadyExistException();

		// create and save publication
		await this.publicationRepository.create({
			publication: newCreatePublication,
		});
	}

	public async preValidateFields({
		title,
		body,
		userUUId,
	}: {
		title: string;
		body: string;
		userUUId: string;
	}): Promise<boolean> {
		const newTitle = new TitleVo(title);
		const newBody = new BodyVo(body);
		const userUUIdVO = new UUidVo(userUUId);
		const existingUserUUId = await this.publicationRepository.existingUserUUId({
			userUUId: userUUIdVO,
		});

		if (!existingUserUUId) return false;
		if (!newTitle.value) return false;
		if (!newBody.value) return false;
		// if (!newUserUUId.value) return false;

		return true;
	}
}
