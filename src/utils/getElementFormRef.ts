import { Ref, toValue } from 'vue'
import { VueInstance } from '@/types/VueInstance'
import { Undef } from '@/types/Undef'

export const getElementFormRef = (refVal: Ref<EventTarget | VueInstance | Undef>): EventTarget | Undef => {
    const value = toValue(refVal)
    return (value as VueInstance)?.$el ?? value
}
