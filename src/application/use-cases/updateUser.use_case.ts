import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

import { repositoriesSymbols } from '@infrastructure/interfaces/repositories.symbol.ts';
import { type IUserRepository } from '@infrastructure/interfaces/UserRepository.interface.ts';
import { UUidVo } from '../../domain/value_objects/uuid.vo.ts';
import { InvalidUpdateException } from '../errors/invalidUpdate.exeption.ts';
import { ValuesUpdated } from '../../infrastructure/interfaces/valuesUpdated.interface.ts';
import { BioVo } from '../../domain/value_objects/bio.vo.ts';
import { NameVo } from '../../domain/value_objects/name.vo.ts';
import { TagNameVo } from '../../domain/value_objects/tagName.vo.ts';

interface IFieldsToUpdate {
	bio?: string;
	name?: string;
	profileImage?: string;
	tagName?: string;
	UserUuid: string;
}

@injectable()
export class UpdateUserUseCase {
	constructor(
		@inject(repositoriesSymbols.userRepository)
		private userRepository: IUserRepository
	) {}

	public async execute({
		bio,
		name,
		profileImage,
		tagName,
		UserUuid,
	}: IFieldsToUpdate) {
		const userUUIdVo = new UUidVo(UserUuid);
		const existingUserUUId = await this.userRepository.findByUUId({
			userUUId: userUUIdVo,
		});

		if (existingUserUUId === null) throw new InvalidUpdateException();
		const bioVo = bio ? new BioVo(bio) : null;
		const nameVo = name ? new NameVo(name) : null;
		const tagNameVo = tagName ? new TagNameVo(tagName) : null;

		const valuesUpdated: ValuesUpdated = {
			bio: bioVo || existingUserUUId.bio,
			name: nameVo || existingUserUUId.name,
			profileImage: profileImage || existingUserUUId.profileImage || '',
			tagName: tagNameVo || existingUserUUId.tagName,
		};

		console.log(valuesUpdated);
	}
}
