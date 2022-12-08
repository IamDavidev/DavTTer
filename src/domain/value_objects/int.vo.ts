import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export class IntVo extends ValueObject<number> {
	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(IntVo.name, this.value);
	}

	protected validate(): boolean {
		if (this.value < 0) return false;
		if (!Number.isInteger(this.value)) return false;
		return true;
	}

	public equals(vo: IntVo): boolean {
		const isEqual = this.value == vo.value;
		return isEqual;
	}
}
