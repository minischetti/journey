import React, { useState, useContext } from "react";
import * as datefns from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ItemsContext, ItemsProvider, useItems } from "../../context/ItemsContext";
import { CalendarContext, CalendarProvider, useCalendar } from "../../context/CalendarContext";
export const Calendar = () => {
    const { items } = useItems();
    const { selectedDate, setSelectedDate, calendarDays, setCalendarDays } = useCalendar();
    const [currentDate, setCurrentDate] = useState(new Date()); // TODO: use context to set date

    const currentDay = () => datefns.format(currentDate, "d");
    const currentMonth = () => datefns.format(currentDate, "MMMM");
    const currentYear = () => datefns.format(currentDate, "yyyy");

    const previousMonth = () => {
        setSelectedDate(datefns.subMonths(currentDate, 1));
    };
    const nextMonth = () => {
        setSelectedDate(datefns.addMonths(currentDate, 1));
    };

    const goToToday = () => {
        setSelectedDate(new Date());
    };

    const dates = [...Array(datefns.getDaysInMonth(currentDate)).keys()].map((i) => i + 1);

    const isToday = (day: number) => {
        const today = new Date();
        return datefns.isSameDay(currentDate, today) && datefns.isSameMonth(currentDate, today) && datefns.isSameYear(currentDate, today) && day === datefns.getDate(today);
    };

    const daysOfWeek = () => ["S", "M", "T", "W", "T", "F", "S"];

    enum View {
        day,
        week,
        month,
        year,
    }

    return (
        <CalendarProvider>
        <ItemsProvider>
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
                {dates.map((date) => (
                    <div
                        key={date}
                        className={`flex flex-col gap-2 aspect-square rounded-lg overflow-hidden border-zinc-700 border p-4 transition-all duration-150 ease-in-out
                            ${isToday(date) ? " border-2 border-zinc-500" : ""}
                            ${selectedDate && datefns.isSameDay(selectedDate, datefns.setDate(currentDate, date)) ? " shadow-inner shadow-zinc-900 bg-zinc-900 border border-zinc-700 text-zinc-100" : ""}
                        `}
                        onClick={() => {
                            setSelectedDate(datefns.setDate(currentDate, date));
                        }}
                        >
                        <div className="text-sm">{date}</div>
                        <div className="flex flex-col gap-2 overflow-auto text-sm">
                            {items.map((item) => date === datefns.getDate(item.date) &&
                                <div className="grid grid-flow-col justify-between items-center px-2 py-1 bg-zinc-700 rounded-md text-zinc-100">
                                    <div className="text-nowrap text-ellipsis overflow-hidden">{item.name}</div>
                                    {item.date && <div className="text-nowrap text-ellipsis overflow-hidden text-xs"> {datefns.format(item.date, "h:mm a")}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </ItemsProvider>
        </CalendarProvider>
    );
};
