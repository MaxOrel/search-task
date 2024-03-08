import { ScreenSpinner, Snackbar } from '@vkontakte/vkui';

import { Icon28ErrorCircleOutline } from '@vkontakte/icons';
import { ReactNode, useContext, useState } from 'react';
import { UserCard } from '../user-card';
import { SearchContext } from './search-context';
import './style.css';

export function SearchResults() {
	const { users, isLoading, errorState } = useContext(SearchContext);
	const [snackbar, setSnackbar] = useState<ReactNode>(null);
	if (isLoading) {
		return <ScreenSpinner state='loading' />;
	}

	if (errorState) {
		if (snackbar) return;
		return (
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={
					<Icon28ErrorCircleOutline fill='var(--vkui--color_icon_negative)' />
				}
			>
				{errorState.message}
			</Snackbar>
		);
	}

	return (
		<div className='usersList'>
			{users.length !== 0 &&
				users.map(user => <UserCard key={user.id} {...user} />)}
		</div>
	);
}
