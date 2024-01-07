<template>
    <div class="container">
        <AppNav />
        <slot />
    </div>
</template>
<style>
    .container {
        display: flex;
        gap: 1rem;
        height: 100vh;
        overflow: hidden;
        /* grid-template-columns: auto 1fr auto; */
    }
</style>
