import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import PublicationModel from '@domain/models/publication.model.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

import { publicationCreateAdapterToVOs } from '@application/adapters/publiactionModel.adapter.ts';
import { IPublicationToCreate } from '@application/interfacs/PublicationToCreate.interface.ts';
import { PublicationIdAlreadyExistException } from '@application/errors/publicationIdAlreadyExist.exception.ts';

import { type IPublicationRepository } from '@infrastructure/interfaces/publicationRepository.interface.ts';
import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';

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

	public async verifyIfExisUserUUId({
		userUUId,
	}: {
		userUUId: string;
	}): Promise<boolean> {
		const newUserUUId = new UUidVo(userUUId);
		console.info(
			'🚀 ~>  file: publicationCreate.use_case.ts:43 ~>  CreatePublicationUseCase ~>  newUserUUId',
			newUserUUId
		);
		return await this.publicationRepository.existingUserUUId(newUserUUId);
	}
}
