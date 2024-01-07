<template>
    <div class="container">
        <AppHeader />
        <!-- <div class="nav-list">
                <router-link v-for="item in nav()" :key="item.name" class="nav-item" :class="{ active: router.currentRoute.value.path === item.path }" :to="item.path">
                    {{ item.name }}
                </router-link>
        </div> -->
        <Calendar />
        <AppFooter />
    </div>
</template>
<script setup lang="ts">
import * as datefns from "date-fns";
const router = useRouter();
const currentYear = () => datefns.format(new Date(), "yyyy");
const currentMonth = () => datefns.format(new Date(), "MMMM");

const nav = () => [
    // {
    //     name: "Calendar",
    //     path: "/calendar",
    // },
    {
        name: "Agenda",
        path: "/agenda",
    },
    {
        name: "Playground",
        path: "/playground",
    }
];
</script>
<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        grid-template-columns: auto 1fr auto;
        background-color: #f5f5f5;
        border-right: 1px solid #e0e0e0;
        padding: 0 1rem;
        min-width: 25dvw;
    }
    .nav-list {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        flex-direction: column;
        gap: 1rem;
    }
    .nav-item {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: #fff;
    }
    a.nav-item {
        text-decoration: none;
        color: #000;
    }
    .nav-item.active {
        background-color: #000;
        color: #fff;
    }
</style>
