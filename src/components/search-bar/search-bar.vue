<script setup lang="ts">
import { ref, watch } from 'vue'
import FlexLayout from '@/components/flex-layout';

import { useClickOutside } from '@/utils/useClickOutside'
import SearchItem from './search-item.vue'
import { useMiniSearch } from './useMiniSearch'


let searchKey = ref<string>('')
const container = ref(null)

const { search, result } = useMiniSearch()

watch(searchKey, () => search(searchKey.value))

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

useClickOutside(container, () => {
    result.value = []
})

</script>

<template>
    <FlexLayout ref="container" flex-direction="column" align-items="center" class="search-bar">
        <FlexLayout class="input-row" align-items="center">
            <input @keydown="handleKeydown" @input="handleInput" @focus="search(searchKey)" />
        </FlexLayout>
        <FlexLayout v-if="result.length > 0" class="data-row" flex-direction="column">
            <hr class="search-bar-divider" />
            <FlexLayout class="search-data-section" tag="ul" align-items="flex-start" flex-direction="column">
                <SearchItem v-for="item of result" :content="item.content" :href="item.href" :key="item.id" />
            </FlexLayout>
        </FlexLayout>
    </FlexLayout>
</template>

<style lang="css" scoped>
.search-bar {
    width: 584px;
    border: 1px solid var(--color-border);
    border-radius: 24px;
    background-color: var(--vp-c-bg);
    box-shadow: var(--box-shadow-1);

    &:hover {
        box-shadow: var(--box-shadow-2);
    }

    &:has(input:focus) {
        box-shadow: var(--box-shadow-3);
    }
}

.data-row {
    width: 100%;
    padding-bottom: 20px;
}

.search-bar-divider {
    box-sizing: border-box;
    width: calc(100% - 24px - 12px);
    margin: 0px 20px 0px 16px;
    padding-bottom: 4px;
    border-top: 1px solid var(--border-color);
    border-bottom: none;
    border-left: none;
    border-right: none;
}

.search-data-section {
    box-sizing: border-box;
    width: 100%;
    max-height: 360px;
    overflow-y: auto;
}

.input-row {
    padding: 0 36px;
    width: 100%;
    height: 44px;
    overflow: hidden;

    & input {
        width: 100%;
        height: 100%;
    }
}
</style>