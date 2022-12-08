import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export class TitleVo extends ValueObject<string> {
	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(TitleVo.name, this.value);
	}
	protected validate(): boolean {
		if (this.value.length > 100) return false;
		return true;
	}
	public equals(vo: ValueObject<string>): boolean {
		const isEqual = this.value == vo.value;
		return isEqual;
	}
}
