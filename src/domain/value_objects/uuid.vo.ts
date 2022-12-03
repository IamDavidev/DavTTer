import { validate as validateId } from '$uuid/v4.ts';
import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';

export class UUidVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this.value !== vo.value) return false;
		return true;
	}

	protected validate(): boolean {
		if (!validateId(this.value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(UUidVo.name, this.value);
	}
}
