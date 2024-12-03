<script setup lang="ts">
import { computed } from 'vue'

type JustifyCntent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

interface Props {
    justifyContent?: JustifyCntent,
    alignItems?: AlignItems,
    flexDirection?: FlexDirection
}
const props = defineProps<Props>()

const compClass = computed(() => {
    return [
        'flex-layout',
        `justify-content--${props.justifyContent ?? 'flex-start'}`,
        `align-items--${props.alignItems ?? 'flex-start'}`,
        `flex-direction--${props.flexDirection ?? 'row'}`
    ]
})

</script>

<template>
    <div :class="compClass">
        <slot />
    </div>
</template>

<style lang="css" scoped>
.flex-layout {
    display: flex;
}

.justify-content--flex-start {
    justify-content: flex-start;
}

.justify-content--flex-end {
    justify-content: flex-end;
}

.justify-content--center {
    justify-content: center;
}

.justify-content--space-between {
    justify-content: space-between;
}

.justify-content--space-around {
    justify-content: space-around;
}

.align-items--flex-start {
    align-items: flex-start;
}

.align-items--flex-end {
    align-items: flex-end;
}

.align-items--center {
    align-items: center;
}

.align-items--baseline {
    align-items: baseline;
}

.align-items--stretch {
    align-items: stretch;
}

.flex-direction--row {
    flex-direction: row;
}

.flex-direction--row-reverse {
    flex-direction: row-reverse;
}

.flex-direction--column {
    flex-direction: column;
}

.flex-direction--column-reverse {
    flex-direction: column-reverse;
}
</style>
