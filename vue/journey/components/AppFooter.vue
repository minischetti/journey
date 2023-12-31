<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <p>
                        &copy; {{ currentYear() }} Journey
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = () => new Date().getFullYear();
</script>