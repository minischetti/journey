import React, { useState, useContext } from "react";
import * as datefns from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ItemsContext, ItemsProvider } from "../../context";

export const Calendar = () => {
    const { items, add, remove } = useContext(ItemsContext);
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

    const isToday = (day: number) => {
        const today = new Date();
        return datefns.isSameDay(date, today) && datefns.isSameMonth(date, today) && datefns.isSameYear(date, today) && day === datefns.getDate(today);
    };

    const daysOfWeek = () => ["S", "M", "T", "W", "T", "F", "S"];

    enum View {
        day,
        week,
        month,
        year,
    }

    return (
        <div className="bg-zinc-800 p-3 rounded-md w-full h-full">
            <div className="flex justify-between p-2">
                <span className="text-2xl font-bold text-center">{currentMonth()}</span>
                <div className="flex gap-2">
                    <button onClick={previousMonth}>
                        <CaretLeft />
                    </button>
                    <button onClick={goToToday}>Today</button>
                    <button onClick={nextMonth}>
                        <CaretRight />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 font-bold gap-4 py-2">
                {daysOfWeek().map((dayOfWeek) => (
                    <div className="grid justify-center" key={dayOfWeek}>
                        {dayOfWeek}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
                {calendarDates().map((calendarDate) => (
                    <div
                        key={calendarDate}
                        className={`flex flex-col gap-2 aspect-square rounded-lg overflow-hidden border-zinc-700 border p-4${
                            isToday(calendarDate) ? " shadow-md shadow-zinc-900 bg-zinc-700" : ""
                        }`}>
                        <span className={isToday(calendarDate) ? "text-zinc-100 font-bold" : "text-zinc-400"}>{calendarDate}</span>
                        <div className="flex flex-col gap-2 overflow-scroll">
                            {items.map((item) => calendarDate === datefns.getDate(item.date) && <span className="px-2 py-1 bg-zinc-600 rounded-md text-zinc-100">{item.name}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
