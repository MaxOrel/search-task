import { User } from '../models/user-models';

export type UserResponseDto = {
	limit: number;
	skip: number;
	total: number;
	users: User[];
};
