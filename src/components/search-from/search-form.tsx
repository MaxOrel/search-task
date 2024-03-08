import {
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useSearchForm } from '../../hooks/useSearchForm';
import './styles.css';

type SearchFormProps = {
	onSearch: (value: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
	const [inputSearchState, setInputSearchState] = useState<string>('');
	const inputRef = useRef<HTMLInputElement | null>(null);

	/**
	 *
	 * Хук useSearchForm используется для оптимизации запросов к серверу и подстановки поискового запроса в URL, внутри использует хук useDebounce и хук useSearchParams библиотеки React Router
	 * @param {number} delay задержка в миллисекундах, необязательный пропс;
	 * @callback setStateComponent коллбек функция изменения стейта компонента, нужна если мы хотим восстанавливать стейт из url после перезагрузки и отправлять запрос на сервер с последним поиском, обязательный пропс
	 */

	const { localSearchValue, setLocalSearchValue } = useSearchForm({
		setStateComponent: setInputSearchState,
		delay: 300,
	});

	function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
		setInputSearchState(e.target.value);
		setLocalSearchValue(e.target.value);
	}

	/**
	 * При изменении стейта с задержкой отправляем запрос на сервер, функция onSearch мемоизирована
	 */
	useEffect(() => {
		onSearch?.(localSearchValue);
	}, [localSearchValue, onSearch]);

	/**
	 * Устанавливаем фокус после рендера компонента
	 */
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className='searchForm'>
			<form onSubmit={(e: SyntheticEvent) => e.preventDefault()}>
				<input
					ref={inputRef}
					name='q'
					type='search'
					aria-label='Поиск по пользователям'
					onChange={inputChangeHandler}
					value={inputSearchState}
				/>
			</form>
		</div>
	);
}
