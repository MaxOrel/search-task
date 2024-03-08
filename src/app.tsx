import { useCallback, useState } from 'react';
import { SearchForm } from './components/search-from';
import { SearchResults } from './components/search-results';
import {
	ErrorState,
	SearchContext,
} from './components/search-results/search-context';
import apiService, { ApiService } from './components/utils/api-service';
import { User } from './models/user-models';
import { UserResponseDto } from './types/response';

export default function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorState, setErrorState] = useState<ErrorState | null>(null);

	const formSearchHandler = useCallback(async function (querySearch: string) {
		try {
			setIsLoading(true);
			const dataUsers = await apiService
				.load({ endpoint: `users/search?q=${querySearch}` })
				.then(ApiService.parseResponse<UserResponseDto>);
			setErrorState(null);
			setUsers(dataUsers.users);
			if (dataUsers.users.length === 0) {
				setErrorState({ message: 'Пользователи не найдены', statusCode: 404 });
			}
		} catch (error) {
			console.log(error);

			setErrorState({ message: 'Ошибка на стороне сервера', statusCode: 500 });
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<>
			<SearchContext.Provider value={{ users, isLoading, errorState }}>
				<SearchForm onSearch={formSearchHandler} />
				<SearchResults />
			</SearchContext.Provider>
		</>
	);
}
