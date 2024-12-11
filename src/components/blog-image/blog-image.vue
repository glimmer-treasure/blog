<script setup lang="ts">
const props = defineProps<{
    src?: string,
    caption?: string,
}>()
</script>
<template>
    <figure>
        <img :src="props.src" :title="props.caption" :alt="props.caption">
        <figcaption v-if="props.caption">{{ props.caption }}</figcaption>
    </figure>
</template>
<style lang="css" scoped>
figure {
    display: flex;
    flex-flow: column;
    padding: 8px;
    border-radius: 8px;

    & figcaption {
        align-self: center;
        margin-top: 12px;
    }
}
</style>