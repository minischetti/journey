<template>
    <div class="container">
        <AppNav />
        <slot />
    </div>
</template>
<style scoped>
    .container {
        display: grid;
        grid-template-columns: auto 1fr auto;
        height: 100vh;
    }
</style>
