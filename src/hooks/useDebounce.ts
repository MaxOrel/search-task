import { useEffect, useState } from 'react';

export const useDebounce = <V>(value: V, ms: number) => {
	const [local, setLocal] = useState<V>(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setLocal(value);
		}, ms);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, ms]);

	return local;
};
