import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export class PlainPassword extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this.value !== vo.value) return false;
		return true;
	}
	protected assertedIsValid(): boolean | void {
		if (!this.validate())
			throw new ValueObjectFormatException(PlainPassword.name, this.value);
	}

	protected validate(): boolean {
		if (
			this.value.length < 8 ||
			this.value.length > 20 ||
			this.value.includes(' ')
		)
			return false;
		return true;
	}
}
