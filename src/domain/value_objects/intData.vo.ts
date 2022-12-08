import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export class IntDateVo extends ValueObject<Date> {
	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(IntDateVo.name, this.value);
	}

	protected validate(): boolean {
		if (this.value.getTime() < new Date().getTime()) {
			return false;
		}
		return true;
	}

	public equals(vo: IntDateVo): boolean {
		const isEqual = this.value == vo.value;
		return isEqual;
	}
}
