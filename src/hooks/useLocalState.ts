import { type Dispatch, useEffect, useState } from "react";

export const useLocalState = <T>(key: string, initialValue?: T): [T, Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);

        const fallbackValue = initialValue || null;

        try {
            const parsed = storedValue ? JSON.parse(storedValue) : fallbackValue;

            if (typeof parsed === "string" && parsed[0] === '"' && parsed[parsed.length - 1] === '"')
                return parsed.slice(1, -1) as T;

            return parsed;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return fallbackValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};
