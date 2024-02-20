import { useEffect } from 'react';

export const useDebouncedEffect = (
    callback: any,
    dependancies: any,
    delay: any
): any => {
    useEffect(() => {
        const handler = setTimeout(() => callback(), delay);
        return () => clearTimeout(handler);
    }, [...(dependancies || []), delay]);
};
