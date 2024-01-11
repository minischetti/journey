<template>
    <div class="tag">
        <slot></slot>
    </div>
</template>

<script>
</script>

<style scoped>
    .tag {
        padding: var(--size-0) var(--size-3);
        border-radius: var(--size-2);
        border: 1px solid #e0e0e0;
        white-space: nowrap;
        background-color: var(--color-light-0);
        background-image: linear-gradient(to bottom, var(--color-light-0), var(--color-light-2));
        box-shadow:
        inset 0 0 0 1px var(--color-light-0),
        0 1px 2px 0 var(--color-light-2);
    }
</style>