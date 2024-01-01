<template>
    <div>
        <!-- Select for day, week, month, year views -->
        <select v-model="view">
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
        </select>

        <!-- Calendar -->
        <Calendar view="{{ view  }}"/>
    </div>
</template>
<script setup lang="ts">
    import { ref } from "vue";
    enum CalendarView {
        Day = "Day",
        Week = "Week",
        Month = "Month",
        Year = "Year",
    }
    const view = ref(CalendarView.Month);
</script>