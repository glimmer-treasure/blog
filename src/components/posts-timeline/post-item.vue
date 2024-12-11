<script setup lang="ts">
import { computed } from 'vue'
import FlexLayout from '@/components/flex-layout';

export interface Props {
    year: number,
    month: number,
    date: number,
    url: string,
    title: string,
    timestamp: number,
}

const props = defineProps<Props>()
const getNumStr = (val: number): string => val > 9 ? `${val}` : `0${val}`
const dateStr = computed(() => `${getNumStr(props.month)}-${getNumStr(props.date)}`)
</script>

<template>
    <FlexLayout class="post-item" tag="li">
        <FlexLayout tag="a" :href="props.url" align-items="center">
            <span class="start-point" />
            <span class="post-date">{{ dateStr }}</span>
            <span class="post-title">{{ props.title }}</span>
        </FlexLayout>
    </FlexLayout>
</template>

<style lang="css" scoped>
.post-item {
    border-left: 1px dashed var(--color-border);
    padding: var(--padding-sm) 0px;

    & .start-point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--color-border);
        transform: translate3d(-50%, 0, 0);
    }

    & .post-date {
        margin-left: var(--margin-md);
    }

    & .post-title {
        margin-left: var(--margin-xl);
    }

    &:hover {
        color: var(--color-primary);

        & .start-point {
            background-color: var(--color-primary-border-hover);
            transform: translate3d(-50%, 0, 0) scale(1.33);
        }

    }
}
</style>