import { type IImagePublication } from '@domain/models/publication.model.ts';

export interface IPublicationToCreate {
	uuid: string;
	title: string;
	body: string;
	image: IImagePublication;
	likes: number;
	likesByUsers: string[];
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
