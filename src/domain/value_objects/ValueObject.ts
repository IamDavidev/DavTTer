export abstract class ValueObject<T> {
	constructor(public readonly value: T) {
		this.assertedIsValid();
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
