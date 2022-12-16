import { UUidVo } from '../../domain/value_objects/uuid.vo.ts';

export interface UserRegister {
	uuid: string;
	bio: string;
	email: string;
	name: string;
	numberOfPublications: number;
	password: string;
	profileImage: string | null;
	publications: UUidVo[] | [];
	tagName: string;
}
