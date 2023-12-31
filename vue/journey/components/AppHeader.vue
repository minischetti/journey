<script setup lang="ts">
const router = useRouter();

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
    }
];
</script>
<template>
    <header>
        <h1>Journey</h1>
        <ul>
            <li v-for="item in nav()" :key="item.name">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
        </ul>
    </header>
</template>
<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
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
</style>
