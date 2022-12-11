import { type IImagePublication } from '@domain/interfaces/ImagePublication.interface.ts';

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
