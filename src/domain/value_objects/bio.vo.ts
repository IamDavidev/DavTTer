import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { regexValidateBio } from '@domain/constants/regexValidate.const.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class BioVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}
	protected validate(): boolean {
		if (!regexValidateBio.test(this._value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(BioVo.name, this._value);
	}
}
