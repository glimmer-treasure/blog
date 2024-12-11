<script setup lang="ts">
import FlexLayout from '@/components/flex-layout';
import PostItem, { Props as Post } from './post-item.vue'

export interface Props {
    name: string | number,
    posts: Post[]
}
const props = defineProps<Props>()
</script>

<template>
    <FlexLayout class="posts-block" flex-direction="column">
        <span class="posts-block__title">
            {{ props.name }}
        </span>
        <FlexLayout tag="ul" flex-direction="column" class="posts-block__body">
            <PostItem v-for="(post, index) of props.posts" v-bind="post" :key="index" />
        </FlexLayout>
    </FlexLayout>
</template>

<style lang="css" scoped>
.posts-block__title {
    font-size: var(--font-size-heading3);
    line-height: var(--line-height-heading3);
    font-weight: bold;
    margin-bottom: var(--margin-sm);
}

.posts-block__body {
    padding-left: var(--padding);
}
</style>