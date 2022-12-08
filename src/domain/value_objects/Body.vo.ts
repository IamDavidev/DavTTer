import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export class BodyVo extends ValueObject<string> {
	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(BodyVo.name, this.value);
	}
	protected validate(): boolean {
		if (this.value.length > 1000) return false;
		return true;
	}
	public equals(vo: ValueObject<string>): boolean {
		const isEqual = this.value == vo.value;
		return isEqual;
	}
}
