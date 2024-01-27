import React, { useState, useContext } from "react";
import * as datefns from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { ItemsContext, ItemsProvider, useItems } from "../../context/ItemsContext";
import { CalendarContext, CalendarProvider, useCalendar } from "../../context/CalendarContext";
export function CalendarMonth() {
    const { items } = useItems();
    const calendar = useCalendar();
    const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);

    // const dates = [...Array(datefns.getDaysInMonth(calendar.selectedDate)).keys()].map((i) => i + 1);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div className="grid grid-cols-7 font-bold gap-4 py-2">
                {calendar.daysOfWeek.map((dayOfWeek) => (
                    <div className="grid justify-center" key={dayOfWeek}>
                        {dayOfWeek}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
                {calendar.getDatesOfMonth().map((date) => (
                    <div
                        key={date}
                        className={`flex flex-col gap-1 aspect-square rounded-lg overflow-hidden border-zinc-700 border p-2 transition-all duration-150 ease-in-out
                            ${calendar.isCurrentDate(date) ? " shadow-zinc-900 bg-zinc-700 border border-zinc-700 text-zinc-100" : ""}
                        `}
                        onClick={() => {
                            calendar.setSelectedDate(datefns.setDate(calendar.currentDate, date));
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            draggedElement?.remove();
                            e.target.appendChild(draggedElement!);
                            // TODO: update item date
                            setDraggedElement(null);
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();

                            const target = e.target as HTMLElement;
                            target.classList.add("bg-zinc-700");
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault();

                            const target = e.target as HTMLElement;
                            target.classList.remove("bg-zinc-700");
                        }}>
                        <div className="text-sm">{date}</div>
                        <div className="flex flex-col gap-2 overflow-auto text-sm">
                            {items.map(
                                (item) =>
                                    date === datefns.getDate(item.date) && (
                                        <div
                                            className="grid grid-flow-col justify-between items-center px-2 py-1 bg-zinc-600 rounded-md text-zinc-100"
                                            key={item.id}
                                            draggable={true}
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData("text/plain", JSON.stringify(item));
                                                setDraggedElement(e.target);
                                            }}>
                                            <div className="text-nowrap text-ellipsis overflow-hidden">{item.name}</div>
                                            {item.date && (
                                                <div className="text-nowrap text-ellipsis overflow-hidden text-xs text-zinc-400">
                                                    {" "}
                                                    {datefns.format(item.date, "h:mm a")}
                                                </div>
                                            )}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
