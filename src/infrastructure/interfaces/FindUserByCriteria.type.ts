import UserModel from '@domain/models/user.model.ts';

export type FindUserByCriteria = Promise<UserModel | null>;
