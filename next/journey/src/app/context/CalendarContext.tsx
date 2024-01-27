import React, { createContext, useState } from 'react';
import * as datefns from 'date-fns';


const CalendarContext = createContext<{
    selectedDate: Date;
    currentDate: Date;
    currentDay: string;
    currentWeek: string;
    currentMonth: string;
    currentYear: string;
    daysOfWeek: string[];
    formattedCurrentDate: string;
    formattedCurrentDay: string;
    formattedCurrentMonth: string;
    formattedCurrentYear: string;
    formattedSelectedDay: string;
    formattedSelectedMonth: string;
    formattedSelectedYear: string;
    formattedCurrentWeek: string;
    formattedSelectedWeek: string;
    getDatesOfMonth: () => number[];
    isCurrentDate: (day: number) => boolean;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
    getDatesOfWeek: () => number[];
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
    goToToday: () => void;
    setSelectedDate: (date: Date) => void;
}>({
    selectedDate: new Date(),
    currentDate: new Date(),
    currentDay: '',
    currentWeek: '',
    currentMonth: '',
    currentYear: '',
    daysOfWeek: [],
    formattedCurrentDay: '',
    formattedCurrentDate: '',
    formattedCurrentMonth: '',
    formattedCurrentYear: '',
    formattedSelectedDay: '',
    formattedSelectedMonth: '',
    formattedSelectedYear: '',
    formattedCurrentWeek: '',
    formattedSelectedWeek: '',
    getDatesOfMonth: () => [],
    isCurrentDate: () => false,
    getDatesOfWeek: () => [],
    goToPreviousMonth: () => {},
    goToNextMonth: () => {},
    goToPreviousWeek: () => {},
    goToNextWeek: () => {},
    goToToday: () => {},
    setSelectedDate: () => {},
});

const { Provider } = CalendarContext;

const CalendarProvider = ({ children }: { children: JSX.Element }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Current Date
    const currentDate = datefns.startOfDay(new Date());
    const formattedCurrentDate = datefns.format(currentDate, "MMMM d, yyyy");
    const formattedCurrentDay = datefns.format(currentDate, "d");
    const formattedCurrentWeek = datefns.format(currentDate, "w");
    const formattedCurrentMonth = datefns.format(currentDate, "MMMM");
    const formattedCurrentYear = datefns.format(currentDate, "yyyy");

    const formattedSelectedDay = datefns.format(selectedDate, "d");
    const formattedSelectedWeek = datefns.format(selectedDate, "w");
    const formattedSelectedMonth = datefns.format(selectedDate, "MMMM");
    const formattedSelectedYear = datefns.format(selectedDate, "yyyy");

    const formatMonth = (date: Date) => {
        return datefns.format(date, "MMMM");
    }

    const formatYear = (date: Date) => {
        return datefns.format(date, "yyyy");
    }

    const formatDay = (date: Date) => {
        return datefns.format(date, "d");
    }

    const formatWeek = (date: Date) => {
        return datefns.format(date, "w");
    }


    // Days of the week
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    // Functions
    const goToPreviousWeek = () => setSelectedDate(datefns.subWeeks(selectedDate, 1));
    const goToNextWeek = () => setSelectedDate(datefns.addWeeks(selectedDate, 1));
    const goToPreviousMonth = () => setSelectedDate(datefns.subMonths(selectedDate, 1));
    const goToNextMonth = () => setSelectedDate(datefns.addMonths(selectedDate, 1));
    const goToToday = () => setSelectedDate(currentDate);
    const getDatesOfWeek = () => {
        const days = datefns.eachDayOfInterval({
            start: datefns.startOfWeek(selectedDate),
            end: datefns.endOfWeek(selectedDate),
        });

        return days.map((date) => datefns.getDate(date));
    }
    const getDatesOfMonth = () => {
        const days = datefns.eachDayOfInterval({
            start: datefns.startOfMonth(selectedDate),
            end: datefns.endOfMonth(selectedDate),
        });

        return days.map((date) => datefns.getDate(date));
    }
    const isCurrentDate = (day: number) => {
        return (
            datefns.isSameDay(selectedDate, currentDate) &&
            day === datefns.getDate(currentDate)
        );
    }

    const value = {
        selectedDate,
        currentDate,
        currentDay: formattedSelectedDay,
        currentWeek: formattedSelectedWeek,
        currentMonth: formattedSelectedMonth,
        currentYear: formattedSelectedYear,
        daysOfWeek,
        formattedCurrentDate,
        formattedCurrentDay,
        formattedCurrentMonth,
        formattedCurrentYear,
        formattedSelectedDay,
        formattedSelectedMonth,
        formattedSelectedYear,
        formattedCurrentWeek,
        formattedSelectedWeek,
        getDatesOfMonth,
        isCurrentDate,
        goToPreviousMonth,
        goToNextMonth,
        getDatesOfWeek,
        goToPreviousWeek,
        goToNextWeek,
        goToToday,
        setSelectedDate,
    }

    return <Provider value={value}>{children}</Provider>;
}

const useCalendar = () => {
    const context = React.useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}

export { CalendarContext, CalendarProvider, useCalendar };