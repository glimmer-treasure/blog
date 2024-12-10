<script setup lang="ts">
import dayjs from 'dayjs'
import FlexLayout from '@/components/flex-layout';
import { data as pages } from './posts.data.js'
import PostsBlock, { Props as PostGroup } from './posts-block.vue';

const groupsMap = pages.map((page) => {
    const { timestamp, url, title } = page
    const time = dayjs(timestamp)
    return {
        year: time.year(),
        month: time.month(),
        date: time.date(),
        url,
        title,
        timestamp,
    }
}).reduce((pre, cur) => {
    const { year } = cur
    if (pre.has(year)) {
        const group = pre.get(year) as PostGroup
        group.posts.push(cur)
        pre.set(year, group)
    } else {
        pre.set(year, {
            name: year,
            posts: [cur]
        })
    }
    return pre
}, new Map<number, PostGroup>())

const groups = [...groupsMap.values()]

</script>

<template>
    <FlexLayout class="posts-timeline" flex-direction="column">
        <PostsBlock v-for="(group, index) of groups" v-bind="group" :key="index" />
    </FlexLayout>
</template>

<style lang="css" scoped>
.posts-timeline {
    max-height: 60vh;
    width: clamp(720px, 50%, 960px);
    box-shadow: var(--box-shadow-3);
    border-radius: var(--border-radius-lg);
    margin: var(--margin-xl) auto;
    padding: var(--padding-xl);
    gap: var(--margin-xl);
}
</style>