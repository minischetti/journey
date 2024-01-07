<template>
    <footer>
        <i>&copy; {{ currentYear() }} Journey</i>
    </footer>
</template>

<script setup lang="ts">
const currentYear = () => new Date().getFullYear();
</script>