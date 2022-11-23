export const debounce = (callback: (args: any) => void, delay: number) => {
    let debounceTimer: NodeJS.Timer;
    return (...args: any) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};
