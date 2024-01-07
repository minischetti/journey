<template>
    <div class="agenda">
        <div class="items">
            <!-- group by select -->
            <div class="flex toolbar">
                <span>Group by</span>
                <div class="group">
                    <select @change="group = $event.target.value">
                        <option v-for="group in groups" :key="group" :value="group">
                            {{ group }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Grouped items -->
            <div v-if="group === 'Tag'" v-for="tagWithItems in tagsWithItems" :key="tagWithItems.tag" class="item">
                <div class="group">
                    <div class="flex space-between">
                        <b>{{ tagWithItems.tag }}</b>
                    </div>
                    <div class="items">
                        <div v-for="item in tagWithItems.items" @click="select(item.id)" :key="item.id" class="item">
                            <b> {{ item.title }}</b>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ungrouped items -->
            <div v-if="group === 'None'" v-for="item in items" :key="item.id" class="item" @click="select(item.id)">
                <b> {{ item.title }}</b>
                <!-- <p>{{ item.content }}</p> -->
                <!-- <div class="tags">
                    <div v-for="tag in item.tags" :key="tag" class="tag">
                        {{ tag }}
                    </div>
                    <div @click="addTag(item.id)" class="button tag">Add Tag</div>
                </div> -->
            </div>
        </div>
        <div class="overlay" :class="{ active: showOverlay }">
            <div v-if="selected?.value">
                <div class="flex space-between">
                    <b>{{ selected.value.title }}</b>
                    <div>
                        <p>{{ datefns.format(selected.value.date, "MMMM d, yyyy") }}</p>
                        <p>{{ datefns.format(selected.value.date, "h:mm a") }}</p>
                    </div>
                    <div class="button" @click="showOverlay = false">
                        Close
                    </div>
                </div>
                <p>{{ selected.value.content }}</p>
                <Tags @addTag="addTag(selected.value.id, $event)">
                    <Tag v-for="tag in selected.value.tags" :key="tag">
                        {{ tag }}
                    </Tag>
                </Tags>
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
        for (let i = 0; i < 10; i++) {
            items.push({
                id: i,
                title: `Item ${i}`,
                content: `Content for item ${i}`,
                // Random date and time
                date: datefns.setHours(date.value, Math.floor(Math.random() * 24)),
                // creationDate: new Date(),
                // lastUpdated: new Date(),
                // reminder: new Date(),
                // random number of tags between 1 and 10
                tags: [...Array(Math.floor(Math.random() * 5) + 1).keys()].map((tag) => `Tag ${tag}`),
                items
            });
        }
        return items;
    };
    const items = ref(createMockItems());
    const selected = ref<{ value: Item | null }>({ value: null });
    enum GroupBy {
        None = "None",
        Tag = "Tag"
    }
    const groups = Object.values(GroupBy);
    const group = ref<GroupBy>(GroupBy.None);
    const tags = ref(new Set(items.value.flatMap((item) => item.tags)));
    // Group items by tag
    const tagsWithItems = ref<{ tag: string; items: Item[] }[]>(
        [...tags.value].map((tag) => ({
            tag,
            items: items.value.filter((item) => item.tags.includes(tag))
        }))
    );

    const addTag = (id: number, tag: string) => {
        const item = items.value.find((item) => item.id === id);
        if (item) {
            item.tags.push(tag);
            tags.value.add(tag);
            tagsWithItems.value = [...tags.value].map((tag) => ({
                tag,
                items: items.value.filter((item) => item.tags.includes(tag))
            }));
        }
    };

    const select = (id: number) => {
        selected.value = { value: items.value.find((item) => item.id === id) };
        showOverlay.value = true;
    };

    const showOverlay = ref(false);
</script>

<style scoped>
    .toolbar {
        display: flex;
        gap: 1rem;
        border-bottom: 1px solid #e0e0e0;
        padding: 0.5rem;
    }
    .agenda {
        display: flex;
        gap: 1rem;
        height: 100dvh;
    }
    .items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: scroll;
        width: 100%;
    }

    .item {
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        cursor: pointer;
    }

    .overlay {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(100%);
        opacity: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: scroll;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);
        transition: all 0.5s ease-in-out;
        min-width: 25vw;
        max-width: fit-content;
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 1px solid #e0e0e0;
    }
    .overlay.active {
        transform: translateX(0);
        opacity: 1;
    }
</style>