import { createContext } from 'react';
import { User } from '../../models/user-models';
type SearchContextTypes = {
	users: User[];
};
export const SearchContext = createContext<SearchContextTypes>({ users: [] });
