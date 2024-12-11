const localStorage = window.localStorage

export const useLocalStorage = <T extends string | number | boolean | object | null>(key: string) => {
    const getItem = () => {
        const jsonData = localStorage.getItem(key)
        return jsonData ? (JSON.parse(jsonData) as T) : null
    }

    const setItem = (data: T) => {
        const oldValue = localStorage.getItem(key)
        if (!data) {
            localStorage.removeItem(key)
            dispatchSetEvent(oldValue, null)
        } else {
            const newValue = JSON.stringify(data)
            localStorage.setItem(key, newValue)
            dispatchSetEvent(oldValue, newValue)
        }
    }

    const dispatchSetEvent = (oldValue: string | null, newValue: string | null) => {
        const payload = {
            key,
            oldValue,
            newValue,
            storage: localStorage
        }
        window.dispatchEvent(new StorageEvent('storage', payload))
    }

    return {
        getItem,
        setItem
    }
}
