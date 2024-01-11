<template>
    <div class="tags">
        <slot></slot>
        <input type="text" placeholder="Enter tag..." class="flat" @keydown.enter="addTag($event.target.value)">
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
const $emit = defineEmits(["addTag"]);
const addTag = (tag) => {
    $emit("addTag", tag);
}
</script>

<style scoped>
.tags {
    display: flex;
    gap: var(--size-1);
    font-size: var(--size-3);
    border: 1px solid #e0e0e0;
    border-radius: var(--size-3);
    padding: var(--size-1);
    background-image: linear-gradient(to top, var(--color-light-0), var(--color-light-2));
    box-shadow: 0 1px 0 1px var(--color-light-1);
}
</style>