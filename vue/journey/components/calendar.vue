<template>
    <div class="calendar">
        <!-- <h1>{{ currentYear }}</h1> -->
        <div class="header">
            <button @click="previousMonth">&lt;</button>
            <h2>{{ currentMonth }}</h2>
            <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days">
            <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
        </div>
        <div class="dates">
            <div v-for="date in calendarDates" :key="date" class="date">
                <div>{{ date }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as datefns from "date-fns";
export default {
    data() {
        return {
            date: new Date(),
        };
    },
    computed: {
        currentYear() {
            return datefns.format(this.date, "yyyy");
        },
        currentMonth() {
            return datefns.format(this.date, "MMMM");
        },
        daysOfWeek() {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        },
        calendarDates() {
            return [...Array(datefns.getDaysInMonth(this.date)).keys()].map((day) => day + 1);
        },
    },
    methods: {
        previousMonth() {
            this.date = datefns.subMonths(this.date, 1);
        },
        nextMonth() {
            this.date = datefns.addMonths(this.date, 1);
        },
    },

    mounted() {
        this.$emit("update:currentMonth", this.currentMonth);
    },

    watch: {
        currentMonth() {
            this.$emit("update:currentMonth", this.currentMonth);
        },
    },

    emits: ["update:currentMonth"],
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
