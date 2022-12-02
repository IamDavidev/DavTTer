import { validate as validateId } from '$uuid/v4.ts';
import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class UUidVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}

	protected validate(): boolean {
		if (!validateId(this._value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(UUidVo.name, this._value);
	}
}
