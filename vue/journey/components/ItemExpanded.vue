<template>
    <div>
        <div class="flex row space-between">
            <b>{{ selected.value.title }}</b>
            <div class="button" @click="showOverlay = false">
                <ph-x />
            </div>
        </div>
        <div class="flex row space-between">
            <p>{{ datefns.format(selected.value.date, "MMMM d, yyyy") }}</p>
            <p>{{ datefns.format(selected.value.date, "h:mm a") }}</p>
        </div>
        <div class="item-expanded-body">
            <p>{{ selected.value.content }}</p>
            <Tags @addTag="addTag(selected.value.id, $event)">
                <Tag v-for="tag in selected.value.tags" :key="tag">
                    {{ tag }}
                </Tag>
            </Tags>
        </div>
    </div>
</template>

<script lang="ts">
import { defineProps, defineEmits } from "vue";
import * as datefns from "date-fns";
// import { Item } from "@/journey/types";
// import { useStore } from "@/journey/store";
// import { useTags } from "@/journey/hooks/useTags";
</script>