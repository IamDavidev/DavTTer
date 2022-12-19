import { NameVo } from '@domain/value_objects/name.vo.ts';
import { TagNameVo } from '@domain/value_objects/tagName.vo.ts';
import { BioVo } from '@domain/value_objects/bio.vo.ts';

export interface ValuesUpdated {
	name?: NameVo;
	tagName?: TagNameVo;
	bio?: BioVo;
	profileImage?: string;
}
