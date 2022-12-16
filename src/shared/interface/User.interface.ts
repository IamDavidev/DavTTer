import { BioVo } from '@domain/value_objects/bio.vo.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { NameVo } from '@domain/value_objects/name.vo.ts';
import { PasswordVo } from '@domain/value_objects/password.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

export interface IUserEntity {
	readonly uuid: UUidVo;
	name: NameVo;
	email: EmailVo;
	password: PasswordVo;
	tagName: TagNameVo;
	bio: BioVo;
	profileImage: string | null;
	numberOfPublications: number;
	publications: UUidVo[] | [];
}
