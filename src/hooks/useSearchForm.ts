import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './useDebounce';

const SEARCH_PHRASE_QUERY_PARAM_NAME = 'q';
const DELAY_IN_MS = 300;

interface UseSearchFormProps {
	setStateComponent: (value: string) => void;
	delay?: number;
}

export const useSearchForm = ({
	setStateComponent,
	delay = DELAY_IN_MS,
}: UseSearchFormProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [localSearchValue, setLocalSearchValue] = useState(() => {
		return searchParams.get(SEARCH_PHRASE_QUERY_PARAM_NAME) ?? '';
	});

	const optimizedValue = useDebounce(localSearchValue, delay);

	useEffect(() => {
		setStateComponent(optimizedValue);
	}, [optimizedValue, setStateComponent]);

	useEffect(() => {
		if (localSearchValue) {
			searchParams.set(SEARCH_PHRASE_QUERY_PARAM_NAME, localSearchValue);
		} else {
			searchParams.delete(SEARCH_PHRASE_QUERY_PARAM_NAME);
		}

		setSearchParams(searchParams);
	}, [localSearchValue, searchParams, setSearchParams]);

	return {
		localSearchValue: optimizedValue,
		setLocalSearchValue,
	};
};
