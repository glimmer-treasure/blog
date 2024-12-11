interface Options {
    duration?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (callback: (...args: any[]) => any, options?: Options) => {
    const duration = options?.duration ?? 0
    let timer: ReturnType<typeof setTimeout> | undefined = void 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            return callback(...args)
        }, duration)
    }
}
