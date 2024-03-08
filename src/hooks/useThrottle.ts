import { useEffect, useRef, useState } from 'react';

export const useThrottle = <V>(value: V, ms: number) => {
	const [local, setLocal] = useState<V>(value);

	const ref = useRef({
		currentValue: value,
		isTimeoutRunning: false,
	});

	useEffect(() => {
		ref.current.currentValue = value;

		if (ref.current.isTimeoutRunning) return;

		ref.current.isTimeoutRunning = true;

		setTimeout(() => {
			setLocal(ref.current.currentValue);
			ref.current.isTimeoutRunning = false;
		}, ms);
	}, [value, ms]);

	return local;
};
