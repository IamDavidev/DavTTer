import { UserRegister } from '@application/interfacs/UserRegister.interface.ts';
import { BioVo } from '@domain/value_objects/bio.vo.ts';
import { EmailVo } from '@domain/value_objects/email.vo.ts';
import { NameVo } from '@domain/value_objects/name.vo.ts';
import { PasswordVo } from '@domain/value_objects/password.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';
import { UUidVo } from '@domain/value_objects/uuid.vo.ts';

export async function userRegisterAdapter({
	bio,
	email,
	name,
	numberOfPublications,
	password,
	profileImage,
	publications,
	tagName,
	uuid,
}: UserRegister) {
	return {
		bio: new BioVo(bio),
		email: new EmailVo(email),
		name: new NameVo(name),
		numberOfPublications,
		uuid: new UUidVo(uuid),
		password: await PasswordVo.create(password),
		profileImage,
		publications,
		tagName: new TagNameVo(tagName),
	};
}

export async function userWithVOsAdapter({
	bio,
	email,
	name,
	numberOfPublications,
	password,
	profileImage,
	publications,
	tagName,
	uuid,
}: UserRegister) {
	return {
		bio: new BioVo(bio),
		email: new EmailVo(email),
		name: new NameVo(name),
		numberOfPublications,
		uuid: new UUidVo(uuid),
		password: await PasswordVo.create(password),
		profileImage,
		publications,
		tagName: new TagNameVo(tagName),
	};
}
