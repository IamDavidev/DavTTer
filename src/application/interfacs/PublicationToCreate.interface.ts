import { type IImagePublication } from '@domain/interfaces/ImagePublication.interface.ts';
import { EFormatImagePublication } from '../../domain/interfaces/FormatImagePUblication.enum.ts';

export interface IPublicationToCreate {
	uuid: string;
	title: string;
	body: string;
	image: IImagePublication;
	likes: number;
	likesByUsers: string[];
	userUUId: string;
	format: EFormatImagePublication;
	createdAt: Date;
	updatedAt: Date;
}
