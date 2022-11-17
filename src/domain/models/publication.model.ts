export default class PublicationModel {
	/**
	 * @param id Publication unique identifier
	 * @param title Title of the publication
	 * @param description Description of the publication
	 * @param image Publication image URL
	 * @param likes Number of likes of the publication
	 * @param user User unique identifier
	 */
	constructor(
		public readonly id: string,
		public title: string,
		public body: string,
		public image: string,
		public likes: number,
		public user: string,
	) {}

	static createPublication(props: PublicationModel): PublicationModel {
		return new PublicationModel(
			props.id,
			props.title,
			props.body,
			props.image,
			props.likes,
			props.user,
		);
	}
}
