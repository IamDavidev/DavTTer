import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { regexValidateTagName } from '../constants/regexValidate.const.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class TagNameVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}

	protected validate(): boolean {
		if (!regexValidateTagName.test(this._value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(TagNameVo.name, this._value);
	}
}
