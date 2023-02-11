import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, props: T | (() => T)) => {
    const [state, setState] = useState<T>(() => {
        const localData = localStorage.getItem(key);
        const localDataParsed = localData ? (JSON.parse(localData) as T) : null;
        if (localDataParsed == null) {
            if (typeof props === 'function') {
                return (props as () => T)();
            } else {
                return props;
            }
        } else {
            return localDataParsed;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState] as [T, typeof setState];
};
