import { useRef, useCallback } from 'react';

export function useThrottledCallback<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const lastCalled = useRef(0);

    return useCallback((...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCalled.current >= delay) {
            lastCalled.current = now;
            callback(...args);
        }
    }, [callback, delay]);
}