import { ValueObject } from '@domain/value_objects/valueObject.ts';
import { ValueObjectFormatException } from '@domain/errors/valueObjectFormat.exception.ts';
import {
	genSalt,
	hash as hashPassword,
} from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import { compare as compareHashPassword } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

export class PasswordVo extends ValueObject<string> {
	private constructor(value: string) {
		super(value);
	}

	public equals(vo: ValueObject<string>): boolean {
		if (this._value !== vo._value) return false;
		return true;
	}

	protected validate(): boolean {
		return true;
	}

	protected assertedIsValid() {
		return true;
	}

	public static async create(password: string): Promise<PasswordVo> {
		if (password.length < 8 || password.length > 20 || password.includes(' '))
			throw new ValueObjectFormatException(PasswordVo.name, password);

		const HAS_SALT_ROUNDS = await genSalt(10);
		const hashedPassword = await hashPassword(password, HAS_SALT_ROUNDS);

		return new PasswordVo(hashedPassword);
	}

	public async compare(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		const isPasswordValid = await compareHashPassword(password, hashedPassword);

		return isPasswordValid;
	}
}
