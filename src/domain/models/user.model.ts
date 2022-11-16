import { validate as validateId } from 'https://deno.land/std@0.164.0/uuid/v4.ts';

import PublicationModel from '@domain/models/publication.model.ts';
import {
  regexValidateBio,
  regexValidateEmail,
  regexValidateName,
  regexValidatePassword,
  regexValidateTagName,
} from '@domain/constants/regexValidate.const.ts';
import { InvalidBioFormatException } from '@domain/errors/invalidBioFormat.exception.ts';
import { InvalidEmailFormatException } from '@domain/errors/invalidEmailFormat.exception.ts';
import { InvalidIdFormatException } from '@domain/errors/invalidIdFormat.exception.ts';
import { InvalidNameFormatException } from '@domain/errors/invalidNameFormat.exception.ts';
import { InvalidPasswordFormatException } from '@domain/errors/invalidPasswordFormat.exception.ts';
import { InvalidTagNameException } from '@domain/errors/invalidTagName.exception.ts';

export default class UserModel {
  /**
   *
   * @param id User unique identifier
   * @param name Name of the user
   * @param email email of the user
   * @param password Hashed password of the user
   * @param tagName Tag Unique identifier
   * @param bio  User bio
   * @param profileImage User profile image URL
   * @param numberPublications Number of publications of the user
   * @param publication Publications array
   *
   */

  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public tagName: string,
    public bio: string,
    public profileImage: string | null,
    public numberPublications: number,
    public publication: PublicationModel[] | []
  ) {}

  static validateId(uuid: string): boolean {
    if (!validateId(uuid)) return false;

    return true;
  }

  static validateEmail(email: string): boolean {
    if (!regexValidateEmail.test(email)) return false;

    return true;
  }

  static validateName(name: string): boolean {
    if (!regexValidateName.test(name)) return false;
    if (name.includes('  ')) return false;
    if (name.includes('--')) return false;

    const nameSplited = name.split(' ');

    for (const word in nameSplited) {
      if (word.startsWith('-')) return false;
      if (word.endsWith('-')) return false;
    }

    return true;
  }

  static validatePassword(password: string): boolean {
    if (!regexValidatePassword.test(password)) return false;

    return true;
  }

  static validateTagName(tagName: string): boolean {
    if (!regexValidateTagName.test(tagName)) return false;
    return true;
  }

  static validateBio(bio: string): boolean {
    if (!regexValidateBio.test(bio)) return false;
    return true;
  }
  static validateProfileImage(): boolean {
    return true;
  }

  static createUser(props: UserModel): UserModel {
    if (!UserModel.validateId(props.id)) throw new InvalidIdFormatException();

    if (!UserModel.validateEmail(props.email))
      throw new InvalidEmailFormatException();

    if (!UserModel.validateName(props.name))
      throw new InvalidNameFormatException();

    if (!UserModel.validatePassword(props.password))
      throw new InvalidPasswordFormatException();

    if (!UserModel.validateTagName(props.tagName))
      throw new InvalidTagNameException();

    if (!UserModel.validateBio(props.bio))
      throw new InvalidBioFormatException();

    return new UserModel(
      props.id,
      props.name,
      props.email,
      props.password,
      props.tagName,
      props.bio,
      props.profileImage,
      0,
      []
    );
  }
}
