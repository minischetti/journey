<template>
    <div class="container">
        <h1>Journey</h1>
        <div class="nav-list">
            <router-link v-for="item in nav()" :key="item.name" class="nav-item" :class="{ active: router.currentRoute.value.path === item.path }" :to="item.path">
                {{ item.name }}
            </router-link>
        </div>
        <AppFooter />
    </div>
</template>
<script setup lang="ts">
import * as datefns from "date-fns";
const router = useRouter();
const currentYear = () => datefns.format(new Date(), "yyyy");
const currentMonth = () => datefns.format(new Date(), "MMMM");

const nav = () => [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Calendar",
        path: "/calendar",
    },
    {
        name: "Overview",
        path: "/overview",
    },
    {
        name: "Agenda",
        path: "/agenda",
    },
    {
        name: "People",
        path: "/people",
    },
];
</script>
<style scoped>
    .container {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: auto 1fr auto;
        background-color: #f5f5f5;
        border-right: 1px solid #e0e0e0;
        padding: 0 1rem;
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
