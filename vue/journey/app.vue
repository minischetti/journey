<script setup lang="ts">
const router = useRouter()

const nav = () => [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
]
</script>
<template>
  <div>
    <h1>Journey</h1>
    <calendar />
    <ul>
      <li v-for="item in nav()" :key="item.name">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
