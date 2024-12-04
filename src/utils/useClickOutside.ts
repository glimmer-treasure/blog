import { Ref, watchEffect } from 'vue'
import { VueInstance } from '@/types/VueInstance'
import { Undef } from '@/types/Undef'
import { AnyFunc } from '@/types/AnyFnuc'
import { getElementFormRef } from '@/utils/getElementFormRef'

interface Options extends EventListenerOptions {
    once?: boolean
    passive?: boolean
    signal?: AbortSignal
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addGlobalClickListener = (handler: (event: MouseEvent) => any, options?: Options) => {
    window.addEventListener('click', handler, options)
    return () => window.removeEventListener('click', handler, options)
}

export const useClickOutside = (target: Ref<EventTarget | VueInstance | Undef>, handler: AnyFunc) => {
    let isProcessingClick = false
    const { stop } = watchEffect((onCleanup) => {
        const targetEl = getElementFormRef(target)
        if (!targetEl) {
            return
        }
        const clickHandler = (event: MouseEvent) => {
            if (isProcessingClick) {
                return
            }
            isProcessingClick = true
            setTimeout(() => (isProcessingClick = false), 0)
            if (!targetEl || targetEl === event.target || event.composedPath().includes(targetEl)) {
                return
            }
            handler(event)
        }
        const stopClickListener = addGlobalClickListener(clickHandler)
        onCleanup(() => stopClickListener())
    })
    return {
        stop
    }
}
