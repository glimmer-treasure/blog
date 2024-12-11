import { watch, toValue, Ref } from 'vue'
import { AnyFunc } from '@/types/AnyFnuc'
import { VueInstance } from '@/types/VueInstance'
import { Undef } from '@/types/Undef'
import { noop } from '@/utils/noop'

interface Options extends EventListenerOptions {
    once?: boolean
    passive?: boolean
    signal?: AbortSignal
}

export const useEventListener = (
    target: Ref<EventTarget | VueInstance | Undef>,
    event: string,
    listener: AnyFunc,
    options?: Options
) => {
    let unregister: AnyFunc = noop

    const register = (el: EventTarget) => {
        el.addEventListener(event, listener, options)
        return () => el.removeEventListener(event, listener, options)
    }

    const cleanup = () => {
        unregister()
        unregister = noop
    }

    const stopWatch = watch(
        () => {
            const plain = toValue(target)
            const elem = (plain as VueInstance)?.$el ?? plain
            return elem
        },
        (elem) => {
            cleanup()
            if (!elem) {
                return
            }
            unregister = register(elem)
        }
    )
    const stop = () => {
        stopWatch()
        cleanup()
    }
    return {
        stop
    }
}
