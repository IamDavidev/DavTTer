import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { regexValidateName } from '@domain/constants/regexValidate.const.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class NameVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}
	protected validate(): boolean {
		if (!regexValidateName.test(this._value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(NameVo.name, this._value);
	}
}
