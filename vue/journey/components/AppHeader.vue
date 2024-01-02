<template>
    <header>
        <div class="row">
            <h1>Journey</h1>
            <ul>
                <li v-for="item in nav()" :key="item.name">
                    <router-link :to="item.path">{{ item.name }}</router-link>
                </li>
            </ul>
        </div>
        <!-- <div class="row center">
            <p>
                {{ currentMonth() }} {{ currentYear() }}
            </p>
        </div> -->
    </header>
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
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 2rem 3rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
}

header h1 {
    margin: 0;
}

header ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.center {
    justify-content: center;
}
</style>
