<script setup lang="ts">
import SearchBar from '@/components/search-bar';
</script>
<template>
    <div class="container">
        <div class="padding-top"></div>
        <SearchBar />
    </div>
</template>
<style lang="css" scoped>
.container {
    width: 100%;
    height: calc(100vh - var(--vp-nav-height));
    background-image: url(/public/home-background-image.svg);
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.padding-top {
    max-height: 290px;
    min-height: 92px;
    height: calc(100vh - 560px);
    width: 100%;
}
</style>