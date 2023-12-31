<template>
    <div class="calendar">
        <div class="header">
            <button @click="previousMonth">&lt;</button>
            <h2>{{ currentMonth }}</h2>
            <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days">
            <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
        </div>
        <div class="dates">
            <div v-for="date in calendarDates" :key="date" class="date">{{ date }}</div>
        </div>
    </div>
</template>

<script>
import { format, getDaysInMonth, getDay, getMonth, getYear, subMonths, addMonths } from "date-fns";
export default {
    data() {
        const currentMonth = format(new Date(), "MMMM yyyy");
        const daysOfWeek = () => {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        };

        const calendarDates = [...Array(getDaysInMonth(new Date(getYear(new Date()), getMonth(new Date())))).keys()].map((day) => day + 1);
        return {
            currentMonth,
            daysOfWeek: daysOfWeek(),
            calendarDates,
        };
    },
    methods: {
        previousMonth() {},
        nextMonth() {},
    },
};
</script>

<style scoped>
.calendar {
    /* Add your calendar styles here */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.days {
    display: grid;

    grid-template-columns: repeat(7, 1fr);
}

.day {
    /* Add your day styles here */
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
    background-color: #eee;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: #666;
    letter-spacing: 0.1rem;
    line-height: 1.5rem;
    cursor: default;
    user-select: none;
}

.dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.date {
    /* Add your date styles here */
    text-align: center;
    padding: 1rem;
    border: 1px solid #ccc;
    background-color: #fff;
    font-weight: bold;
    font-size: 0.8rem;
    color: #666;
    letter-spacing: 0.1rem;
    line-height: 1.5rem;
    cursor: pointer;
    user-select: none;
    aspect-ratio: 1;
}
</style>
