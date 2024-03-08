import { createContext } from 'react';
import { User } from '../../models/user-models';
export type ErrorState = {
	message: string;
	statusCode: number;
};
type SearchContextTypes = {
	users: User[];
	isLoading: boolean;
	errorState: ErrorState | null;
};
export const SearchContext = createContext<SearchContextTypes>({
	users: [],
	isLoading: false,
	errorState: null,
});
