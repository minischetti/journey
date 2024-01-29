import React from "react";
import { useCalendar } from "../../context/CalendarContext";

export const CalendarWeek = () => {
    const calendar = useCalendar();

    return (
        <div style={{ display: "grid", gridAutoFlow: "row" }}>
            <div style={{ display: "grid", gridAutoFlow: "column" }}>
                {calendar.daysOfWeek.map((day) => (
                    <div className="text-center font-bold" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(7, 1fr)", gridAutoFlow: "row" }}>
                {calendar.getDatesOfWeek().map((date) => (
                    <div key={date} style={{aspectRatio: "1/1",  border: "2px solid #ccc", borderRadius: "0.5rem"}}>
                        <div className="header">
                            <div className="flex justify-between">
                                <span>{date}</span>
                            </div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
