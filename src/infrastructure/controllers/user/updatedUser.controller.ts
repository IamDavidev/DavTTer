import { type RouterContext } from '$oak/router.ts';
import { inject, injectable } from '@shared/packages/npm/inversify.package.ts';

export class UpdateUserController {
	constructor() {}

	public async execute({ request }: RouterContext<'/'>) {
		const { name, tagName, bio, profileImage } = await request.body({
			type: 'json',
		}).value;
	}
}
