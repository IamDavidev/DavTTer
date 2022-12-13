import { validate as validateUUId } from '$uuid/v4.ts';

import { ValueObject } from '@domain/value_objects/ValueObject.ts';
import { ValueObjectFormatException } from '@domain/errors/valueObjectFormat.exception.ts';

export class UUidVo extends ValueObject<string> {
	public equals(vo: ValueObject<string>): boolean {
		if (this.value !== vo.value) return false;
		return true;
	}

	protected validate(): boolean {
		if (!validateUUId(this.value)) return false;
		return true;
	}

	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(UUidVo.name, this.value);
	}
}
