export class UserModel {
  /**
   *
   * @param id User unique identifier
   * @param name Name of the user
   * @param email email of the user
   * @param password Hashed password of the user
   * @param tagName Tag Unique identifier
   * @param bio  User bio
   * @param profileImage User profile image URL
   * @param likes Number of likes of Images
   * @param banner User banner image URL
   * @param images Ids of the images uploaded by the user
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
    public likes: number,
    public banner: string | null, // private list_of_matches: string[] = []
    public images: string | null
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
      props.likes,
      props.banner,
      props.images
    );
  }
}
