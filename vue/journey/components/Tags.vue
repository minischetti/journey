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
        gap: 0.5rem;
        font-size: inherit;
        border: 1px solid #e0e0e0;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
</style>