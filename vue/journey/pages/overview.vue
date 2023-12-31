<template>
    <div>
        <div class="container">
            <div>
                <div>
                    <h1>{{ currentMonth() }}</h1>
                </div>
            </div>
            <div class="day">
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
    methods: {
        currentMonth() {
            return datefns.format(this.date, "MMMM");
        },
        daysOfWeek() {
            return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        },
        calendarDates() {
            return [...Array(datefns.getDaysInMonth(this.date)).keys()].map((day) => day + 1);
        },
        previousMonth() {
            this.date = datefns.subMonths(this.date, 1);
        },
        nextMonth() {
            this.date = datefns.addMonths(this.date, 1);
        },
    },
};
</script>

<style scoped></style>
