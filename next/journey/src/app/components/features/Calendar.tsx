import React from "react";
import { useCalendar } from "../../context/CalendarContext";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
export function Calendar({children}: {children: React.ReactNode}) {
    const calendar = useCalendar();

    return (
        <div style={{display: "grid", gridAutoFlow: "row"}}>
            <div className="flex justify-between p-2">
                <div className="flex gap-1 text-2xl tracking-wider">
                    <span className="font-bold">{calendar.currentMonth}</span>
                    <span>{calendar.currentYear}</span>
                </div>
                <div className="flex gap-2 items-center rounded-md">
                    <button className="py-2 px-4 rounded-md hover:bg-zinc-200" onClick={calendar.goToPreviousWeek}>
                        <CaretLeft />
                    </button>
                        <div>Week {calendar.currentWeek}</div>
                    <button className="py-2 px-4 rounded-md hover:bg-zinc-200" onClick={calendar.goToNextWeek}>
                        <CaretRight />
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
}
