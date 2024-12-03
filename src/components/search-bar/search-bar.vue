<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMiniSearch } from './useMiniSearch'
import FlexLayout from '@/components/flex-layout';

let searchKey = ref<string>('')

const searchEngine = useMiniSearch()

const search = (value: string) => {
    const data = searchEngine.search(value)
    console.log(data)
}

watch(searchKey, () => {
    console.log(`搜索的值为：${searchKey.value}`)
    search(searchKey.value)
})

const handleKeydown = (event: KeyboardEvent) => {
    const { key, ctrlKey, metaKey, shiftKey, isComposing } = event
    if (ctrlKey || metaKey || shiftKey) {
        return
    }
    if (key.toLowerCase() === 'enter') {
        const value = searchKey.value
        searchKey.value = ''
        search(value)
        return
    }
    if (isComposing) {
        searchKey.value += event.key
    }
}

const handleInput = (event: InputEvent) => {
    const target = event.target as HTMLInputElement
    searchKey.value = target.value
}

</script>

<template>
    <FlexLayout flex-direction="column" align-items="center" class="search-bar">
        <FlexLayout class="input_row" align-items="center">
            <input @keydown="handleKeydown" @input="handleInput" />
        </FlexLayout>
        <FlexLayout align-items="center">

        </FlexLayout>
    </FlexLayout>
</template>

<style lang="css" scoped>
.search-bar {
    width: 584px;
    border: 1px solid #dfe1e5;
    border-radius: 24px;
    background-color: var(--vp-c-bg);
}

.search-bar:has(input:focus) {
    box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0
}

.search-bar input {
    width: 100%;
}

.input_row {
    padding: 0 36px;
    width: 100%;
    height: 44px;
    overflow: hidden;
}

.input_row input {
    height: 100%;
}
</style>