<template>
    <div class="container">
        <AppNav />
        <slot />
    </div>
</template>
<style>
    .container {
        display: grid;
        grid-template-columns: 1fr 4fr;
        /* gap: 1rem; */
        height: 100vh;
        overflow: hidden;
    }
</style>
