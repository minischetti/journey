<template>
    <div class="calendar">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as datefns from "date-fns";

const date = ref(new Date());

const currentDay = () => datefns.format(date.value, "d");
const currentMonth = () => datefns.format(date.value, "MMMM");
const currentYear = () => datefns.format(date.value, "yyyy");

const previousMonth = () => {
    date.value = datefns.subMonths(date.value, 1);
};
const nextMonth = () => {
    date.value = datefns.addMonths(date.value, 1);
};

const goToToday = () => {
    date.value = new Date();
};

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
</script>

<style scoped>
.calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #e0e0e0;
}

.day__header {
    background-color: #f5f5f5;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
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
    border-radius: 1rem;
    margin: 0.5rem;
    font-weight: bold;
}


</style>