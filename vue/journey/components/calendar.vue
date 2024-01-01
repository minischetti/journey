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
      <div v-for="calendarDate in calendarDates" :key="calendarDate" class="date">
        <div>{{ calendarDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as datefns from "date-fns";
import { ref } from 'vue';

const date = ref(new Date());
const currentYear = datefns.format(date.value, "yyyy");
const currentMonth = datefns.format(date.value, "MMMM");
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const calendarDates = [...Array(datefns.getDaysInMonth(date.value)).keys()].map(
  (day) => day + 1
);
const previousMonth = () => {
  date.value = datefns.subMonths(date.value, 1);
};
const nextMonth = () => {
  date.value = datefns.addMonths(date.value, 1);
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
