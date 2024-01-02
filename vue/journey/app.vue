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

button {
  border: none;
  background-color: #000;
  font-size: 1rem;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

button.border {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
}
</style>
