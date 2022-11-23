export interface UserRegister {
	uuid: string;
	bio: string;
	email: string;
	name: string;
	numberOfPublications: number;
	password: string;
	profileImage: string | null;
	publications: string[] | [];
	tagName: string;
}
