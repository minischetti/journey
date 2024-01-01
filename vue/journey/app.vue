<script setup lang="ts">
const router = useRouter();

const nav = () => [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Contact",
        path: "/contact",
    },
];
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
</style>
