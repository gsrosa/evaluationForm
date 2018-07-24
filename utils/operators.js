export const partialize = (fn,...args) =>
    fn.bind(null,...args);

export const compose = (...fns) => value =>
    fns.reduceRight((previosValue, fn) =>
        fn(previosValue), value);

export const pipe = (...fns) => value =>
    fns.reduce((previosValue, fn) =>
        fn(previosValue), value);

export const takeUntil = (times, fn) =>
    () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn,milliseconds);
    }
}

export const addEvents = (element,ev,fn) => {
    $(element).on(ev,fn);
}
