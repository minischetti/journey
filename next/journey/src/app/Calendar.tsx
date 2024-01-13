import React, { useState } from "react";
import * as datefns from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    const currentDay = () => datefns.format(date, "d");
    const currentMonth = () => datefns.format(date, "MMMM");
    const currentYear = () => datefns.format(date, "yyyy");

    const previousMonth = () => {
        setDate(datefns.subMonths(date, 1));
    };
    const nextMonth = () => {
        setDate(datefns.addMonths(date, 1));
    };

    const goToToday = () => {
        setDate(new Date());
    };

    const calendarDays = () => [...Array(datefns.getDaysInMonth(date)).keys()];
    const calendarDates = () => calendarDays().map((day) => day + 1);

    const isToday = (day) => {
        const today = new Date();
        return (
            datefns.isSameDay(date, today) &&
            datefns.isSameMonth(date, today) &&
            datefns.isSameYear(date, today) &&
            day === datefns.getDate(today)
        );
    };

    const daysOfWeek = () => ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <div className="bg-zinc-800 p-3 rounded-md">
            <div className="flex justify-between p-2">
                <button onClick={previousMonth}><CaretLeft/></button>
                <span className="text-2xl font-bold text-center">{currentMonth()}</span>
                <button onClick={nextMonth}><CaretRight/></button>
            </div>
            <div className="grid grid-cols-7 font-bold">
                {daysOfWeek().map((dayOfWeek) => (
                    <div className="flex content-center justify-center p-2" key={dayOfWeek}>
                        {dayOfWeek}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {calendarDates().map((calendarDate) => (
                    <div
                        className={`flex content-center justify-center p-2 ${
                            isToday(calendarDate) ? "bg-zinc-600 font-bold rounded-md" : ""
                        }`}
                        key={calendarDate}
                    >
                        {calendarDate}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
