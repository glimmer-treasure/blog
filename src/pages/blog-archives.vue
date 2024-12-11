<script setup lang="ts">
import PostsTimeline from '@/components/posts-timeline';
</script>
<template>
    <PostsTimeline />
</template>
<style lang="css" scoped>
.archives {
    height: 60vh;
    width: clamp(720px, 50%, 1440px);
    max-width: 1440px;
    box-shadow: var(--box-shadow-3);
    margin: 32px auto;
}
</style>