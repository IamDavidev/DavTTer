import { ValueObject } from '@domain/value_objects/ValueObject.ts';
import { regexValidateName } from '@domain/constants/regexValidate.const.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class NameVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this.value !== vo.value) return false;
		return true;
	}
	protected validate(): boolean {
		if (!regexValidateName.test(this.value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(NameVo.name, this.value);
	}
}
