import { ValueObjectFormatException } from '../errors/valueObjectFormat.exception.ts';
import { ValueObject } from './ValueObject.ts';

export const TEN_MINUTES_IN_MILLISECONDS = 600000;
export class IntDateVo extends ValueObject<Date> {
	protected assertedIsValid(): void {
		if (!this.validate())
			throw new ValueObjectFormatException(IntDateVo.name, this.value);
	}

	protected validate(): boolean {
		const dif = Math.abs(new Date().getTime() - this.value.getTime());

		if (dif > TEN_MINUTES_IN_MILLISECONDS) return false;
		return true;
	}

	public equals(vo: IntDateVo): boolean {
		const isEqual = this.value == vo.value;
		return isEqual;
	}
}
