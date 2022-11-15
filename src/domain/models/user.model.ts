import PublicationModel from '@domain/models/publication.model.ts';
// import { v4 } from 'https://deno.land/std@0.164.0/uuid/v4.ts';
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

  static validateId(): boolean {
    return true;
  }

  static validateEmail(): boolean {
    return true;
  }

  static validateName(): boolean {
    return true;
  }

  static validatePassword(): boolean {
    return true;
  }

  static validateTagName(): boolean {
    return true;
  }

  static validateBio(): boolean {
    return true;
  }
  static validateProfileImage(): boolean {
    return true;
  }

  static createUser(props: UserModel): UserModel {
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
