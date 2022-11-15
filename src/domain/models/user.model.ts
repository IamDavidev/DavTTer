import PublicationModel from './publication.model.ts';

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
   * @praam numberPublications Number of publications of the user
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
    public publication: PublicationModel[]
  ) {}

  static createUser(props: UserModel): UserModel {
    return new UserModel(
      props.id,
      props.name,
      props.email,
      props.password,
      props.tagName,
      props.bio,
      props.profileImage,
      props.numberPublications,
      props.publication
    );
  }
}
