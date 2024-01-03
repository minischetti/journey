<template>
    <div class="container">
        <div class="items">
            <div v-for="item in items" :key="item.id" class="item">
                <div class="flex space-between">
                    <b>{{ item.title }}</b>
                    <!-- <div>
                        <p>{{ datefns.format(item.date, "MMMM d, yyyy") }}</p>
                        <p>{{ datefns.format(item.date, "h:mm a") }}</p>
                    </div> -->
                    <!-- <div class="actions">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div> -->

            </div>
                <!-- <p>{{ item.content }}</p> -->
                <div class="tags">
                    <div v-for="tag in item.tags" :key="tag" class="tag">
                        {{ tag }}
                    </div>
                    <!-- Add tag button -->
                    <div @click="addTag(item.id)" class="button tag">Add Tag</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import * as datefns from "date-fns";
    import {PhPencil} from "@phosphor-icons/vue";

    const date = ref(new Date());

    const currentMonth = () => datefns.format(date.value, "MMMM");
    const currentYear = () => datefns.format(date.value, "yyyy");
    const currentDay = () => datefns.format(date.value, "d");
    interface Item {
        id: number;
        title: string;
        content: string;
        date: Date;
        // creationDate: Date;
        // lastUpdated: Date;
        // reminder: Date;
        tags: string[];
        items: Item[];
    }
    const createMockItems = () => {
        const items: Item[] = [];
        for (let i = 0; i < 100; i++) {
            items.push({
                id: i,
                title: `Item ${i}`,
                content: `Content for item ${i}`,
                date: new Date(),
                // creationDate: new Date(),
                // lastUpdated: new Date(),
                // reminder: new Date(),
                // random number of tags between 1 and 10
                tags: [...Array(Math.floor(Math.random() * 10) + 1).keys()].map((tag) => `Tag ${tag}`),
                items
            });
        }
        return items;
    };
    const items = ref(createMockItems());

    const addTag = (id: number) => {
        const item = items.value.find((item) => item.id === id);
        if (item) {
            item.tags.push(`Tag ${item.tags.length}`);
        }
    };
</script>

<style scoped>
    .container {
        display: grid;
    }
    .items {
        display: grid;
        gap: 1rem;
    }

    .item {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #fff;
        border: 1px solid #e0e0e0;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        font-size: 14px;
    }

    .tag {
        padding: 0.25rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e0e0e0;
    }
</style>