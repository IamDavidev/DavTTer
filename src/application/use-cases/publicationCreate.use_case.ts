import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import PublicationModel from '@domain/models/publication.model.ts';

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

		// check if publication already exist
		const existPublicationByUUId = await this.publicationRepository.findByUUId({
			publicationUUId: newCreatePublication.uuid,
		});
		if (existPublicationByUUId) throw new PublicationIdAlreadyExistException();

		// create and save publication
		await this.publicationRepository.create({
			publication: newCreatePublication,
		});
	}
}
