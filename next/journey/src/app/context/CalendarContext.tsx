import React, { createContext, useState } from 'react';
import * as datefns from 'date-fns';


const CalendarContext = createContext<{
    selectedDate: Date;
    currentDay: string;
    currentMonth: string;
    currentYear: string;
    daysOfWeek: string[];
    getDatesOfWeek: () => number[];
    goToPreviousWeek: () => void;
    goToNextWeek: () => void;
    goToToday: () => void;
    setSelectedDate: (date: Date) => void;
}>({
    selectedDate: new Date(),
    currentDay: '',
    currentMonth: '',
    currentYear: '',
    daysOfWeek: [],
    getDatesOfWeek: () => [],
    goToPreviousWeek: () => {},
    goToNextWeek: () => {},
    goToToday: () => {},
    setSelectedDate: () => {},
});

const { Provider } = CalendarContext;

const CalendarProvider = ({ children }: { children: JSX.Element }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Current Date
    const currentDay = datefns.format(selectedDate, "d");
    const currentMonth = datefns.format(selectedDate, "MMMM");
    const currentYear = datefns.format(selectedDate, "yyyy");

    // Days of the week
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    // Functions
    const goToPreviousWeek = () => setSelectedDate(datefns.subWeeks(selectedDate, 1));
    const goToNextWeek = () => setSelectedDate(datefns.addWeeks(selectedDate, 1));
    const goToToday = () => setSelectedDate(new Date());
    const getDatesOfWeek = () => {
        const days = datefns.eachDayOfInterval({
            start: datefns.startOfWeek(selectedDate),
            end: datefns.endOfWeek(selectedDate),
        });

        return days.map((date) => datefns.getDate(date));
    }
    const isCurrentWeek = (day: number) => {
        const today = new Date();
        return (
            datefns.isSameWeek(selectedDate, today) &&
            day === datefns.getDate(today)
        );
    }

    const value = {
        selectedDate,
        currentDay,
        currentMonth,
        currentYear,
        daysOfWeek,
        getDatesOfWeek,
        goToPreviousWeek,
        goToNextWeek,
        goToToday,
        setSelectedDate,
    }

    return <Provider value={value}>{children}</Provider>;
}

const useCalendar = () => {
    const {
        selectedDate,
        currentDay,
        currentMonth,
        currentYear,
        daysOfWeek,
        getDatesOfWeek,
        goToPreviousWeek,
        goToNextWeek,
        goToToday,
        setSelectedDate,
    } = React.useContext(CalendarContext);
    return {
        selectedDate,
        currentDay,
        currentMonth,
        currentYear,
        daysOfWeek,
        getDatesOfWeek,
        goToPreviousWeek,
        goToNextWeek,
        goToToday,
        setSelectedDate,
    };
}

export { CalendarContext, CalendarProvider, useCalendar };