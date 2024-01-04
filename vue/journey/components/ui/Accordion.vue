<template>
    <div class="accordion">
        <div class="head">
            <slot name="head" />
            <button @click="toggle">Toggle</button>
        </div>
        <div class="body">
            <slot name="body" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);

const toggle = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.accordion {
    display: flex;
    flex-direction: column;
}
</style>