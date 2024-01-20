import React, { createContext, useState } from 'react';


const CalendarContext = createContext<{
    selectedDate: Date;
    calendarDays: Date[];
    setSelectedDate: (date: Date) => void;
    setCalendarDays: (calendarDays: Date[]) => void;
}>({
    selectedDate: new Date(),
    calendarDays: [],
    setSelectedDate: () => {},
    setCalendarDays: () => {},
});

const { Provider } = CalendarContext;

const CalendarProvider = ({ children }: { children: JSX.Element }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [calendarDays, setCalendarDays] = useState<Date[]>([]);

    const value = { selectedDate, setSelectedDate, calendarDays, setCalendarDays };

    return <Provider value={value}>{children}</Provider>;
}

const useCalendar = () => {
    const { selectedDate, calendarDays, setSelectedDate, setCalendarDays } = React.useContext(CalendarContext);
    return { selectedDate, calendarDays, setSelectedDate, setCalendarDays };
}

export { CalendarContext, CalendarProvider, useCalendar };