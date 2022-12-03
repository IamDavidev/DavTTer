export abstract class ValueObject<T> {
	public readonly _value: T;

	constructor(value: T) {
		this._value = value;

		this.assertedIsValid();
	}

	get value() {
		return this._value;
	}

	set value(_value: T) {
		throw new Error('Value cannot be changed');
	}

	/**
	 * validate the value object and throw an exception if it is not valid
	 *
	 *  @returns {string} value of the value object
	 */
	protected abstract assertedIsValid(): void;

	/**
	 * Validaction of the value object to see if it is valid
	 * @returns {boolean}
	 */
	protected abstract validate(): boolean;

	/**
	 * Compare two value objects to see if they are equal
	 *
	 * @param vo value object to compare
	 * @returns
	 */
	public abstract equals(vo: ValueObject<T>): boolean;
}
