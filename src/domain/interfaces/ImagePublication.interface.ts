export enum EObjetFitImage {
	COVER = 'cover',
	CONTAIN = 'contain',
	FILL = 'fill',
	NONE = 'none',
}

export interface IImagePublication {
	url: string;
	alt: string;
	height: number;
	width: number;
	objectFit: 'cover' | 'contain' | 'fill' | 'none';
}
