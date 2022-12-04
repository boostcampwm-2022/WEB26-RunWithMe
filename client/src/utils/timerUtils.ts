export const debounce = (callback: (args: any) => void, delay: number) => {
    let debounceTimer: NodeJS.Timer;
    return (...args: any) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};

export const throttle = (callback: (args: any) => void, delay: number) => {
    let throttleTimer: NodeJS.Timer | null;
    return (...args: any) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                throttleTimer = null;
                callback.apply(this, args);
            }, delay);
        }
    };
};
