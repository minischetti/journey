<template>
    <!-- The day's items on the left side -->
    <div class="container">
        <div class="day">
            <div class="day__header">
                <div class="day__header__item" v-for="day in daysOfWeek()" :key="day">
                    {{ day }}
                </div>
            </div>
            <div class="day__body">
                <div class="day__body__item" v-for="day in calendarDates()" :key="day"
                    :class="{ 'day__body__item--today': isToday(day) }">
                    {{ day }}
                </div>
            </div>
        </div>
    </div>
    <!-- Small calendar on right side -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as datefns from "date-fns";

const date = ref(new Date());

const currentMonth = () => datefns.format(date.value, "MMMM");

const calendarDays = () => [...Array(datefns.getDaysInMonth(date.value)).keys()];
const calendarDates = () => calendarDays().map((day) => day + 1);

const isToday = (day: number) => {
    const today = new Date();
    return (
        datefns.isSameDay(date.value, today) &&
        datefns.isSameMonth(date.value, today) &&
        datefns.isSameYear(date.value, today) &&
        day === datefns.getDate(today)
    );
};

const daysOfWeek = () => [
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
];
const items = ref([
    {
        id: 1,
        title: "Item 1",
        description: "Description 1",
        date: new Date(),
    },
    {
        id: 2,
        title: "Item 2",
        description: "Description 2",
        date: new Date(),
    },
    {
        id: 3,
        title: "Item 3",
        description: "Description 3",
        date: new Date(),
    },
]);
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.day {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.day__header, .day__body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.day__header__item, .day__body__item {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
}

.day__body__item--today {
    background-color: #f0f0f0;
}
</style>