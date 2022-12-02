import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { regexValidateEmail } from '../constants/regexValidate.const.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class EmailVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}
	protected validate(): boolean {
		if (!regexValidateEmail.test(this._value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(EmailVo.name, this._value);
	}
}
