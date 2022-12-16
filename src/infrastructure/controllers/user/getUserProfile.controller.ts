import { RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

import { type GetUserProfileUseCase } from '@application/use-cases/getUserProfile.use_case.ts';

import { useCasesSymbols } from '@infrastructure/interfaces/useCases.symbol.ts';
import { RouteGetUserProfile } from '@infrastructure/interfaces/Enpoints.types.ts';

export interface GetUserProfile {
	name: string;
	bio: string;
	email: string;
	tagName: string;
	profileImage: string;
	numberOfPublications: number;
	publications: string[];
}

@injectable()
export class GetUserProfileController {
	constructor(
		@inject(useCasesSymbols.getUserProfileUseCase)
		private getUserProfileUseCase: GetUserProfileUseCase
	) {}

	public async execute({
		params,
		response,
	}: RouterContext<RouteGetUserProfile>): Promise<void> {
		const userUUId = new UUidVo(params.uuid);

		const userModelDB = await this.getUserProfileUseCase.execute({
			userUUId,
		});

		response.status = 200;
		response.body = {
			name: userModelDB.name.value,
			bio: userModelDB.bio.value,
			email: userModelDB.email.value,
			tagName: userModelDB.tagName.value,
			profileImage: userModelDB.profileImage || '',
			numberOfPublications: userModelDB.numberOfPublications,
			publications: userModelDB.publications.map(publication => {
				return publication.value;
			}),
		};
	}
}
