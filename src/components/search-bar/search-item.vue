<script setup lang="ts">
import FlexLayout from '@/components/flex-layout'

interface Props {
    content: string
    href: string
}

const props = defineProps<Props>()

</script>

<template>
    <FlexLayout class="search-item" tag="li" align-items="center">
        <FlexLayout inline class="search-item__content" tag="a" :href="props.href" align-items="center">
            {{ props.content }}
        </FlexLayout>
    </FlexLayout>
</template>

<style lang="css" scoped>
.search-item {
    --item-height: 36px;
    width: 100%;
    height: var(--item-height);
    line-height: var(--item-height);
    padding: 0px 20px 0px 16px;

    &:hover {
        background-color: rgb(243, 245, 246);
    }
}

.search-item__content {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>